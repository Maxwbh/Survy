# coding=utf-8
from django.core.cache import cache
from django.utils.translation import ugettext as _
from django.db.models import Model, DateTimeField


class ZCachedModel(Model):
    class Meta:
        abstract = True

    data_cadastro = DateTimeField(verbose_name=_(u'Data de Cadastro'), auto_now_add=True, blank=True, null=True)

    def save(self, *args, **kwargs):
        super(ZCachedModel, self).save(*args, **kwargs)
        self.clean_cached()

    def delete(self, using=None):
        super(ZCachedModel, self).delete(using=None)
        self.clean_cached()

    @classmethod
    def cachethis(cls, name, args=None, kwargs=None, unique=False, selected_related=None, prefetch_related=None):
        key = cls.cached_key_name(name)
        val = cache.get(key)
        if not val:
            if kwargs:
                if selected_related:
                    val = list(cls.objects.filter(**kwargs).select_related(selected_related))
                if prefetch_related:
                    val = list(cls.objects.filter(**kwargs).prefetch_related(prefetch_related))
                if not prefetch_related and not selected_related:
                    val = list(cls.objects.filter(**kwargs))
            if args:
                if selected_related:
                    val = list(cls.objects.filter(*args).select_related(selected_related))
                if prefetch_related:
                    val = list(cls.objects.filter(*args).prefetch_related(prefetch_related))
                if not prefetch_related and not selected_related:
                    val = list(cls.objects.filter(*args))
            cache.set(key, val)
        if unique:
            try:
                return val[0]
            except:
                pass

        return val

    @classmethod
    def cached_keys(cls):
        keys = ['count', 'all', 'latest'] + getattr(cls, 'cache_keys', [])
        return [cls.cached_key_name(x) for x in keys]

    @classmethod
    def clean_cached(cls):
        for key in cls.cached_keys(): cache.delete(key)

    @classmethod
    def cached_key_name(cls, name):
        cls_name = cls.__name__.lower()
        app_name = cls._meta.app_label.lower()
        return '%s_%s__%s' % (app_name, cls_name, name)

    @classmethod
    def count(cls):
        key = cls.cached_key_name('count')
        val = cache.get(key)
        if not val:
            val = cls.objects.count()
            cache.set(key, val)
        return val

    @classmethod
    def latest(cls):
        key = cls.cached_key_name('latest')
        val = cache.get(key)
        if not val:
            val = [cls.objects.latest('pk')]
            cache.set(key, val)
        return val[0]

    @classmethod
    def all(cls):
        key = cls.cached_key_name('all')
        val = cache.get(key)
        if not val:
            val = list(cls.objects.all())
            cache.set(key, val)
        return val
