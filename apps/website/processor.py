# -*- coding: utf-8 -*-
import logging
from .models import Configuration


logger = logging.getLogger(__name__)


def website(request):
    dominiows = request.build_absolute_uri()
    ret_dict = {
        'dominiows': dominiows,
        'dominio': dominiows.rstrip('/')
    }
    # Configuration
    try:
        ret_dict.update({'config': Configuration.objects.get(active=True)})
    except Exception as e:
        logger.debug(str(e))
        print 'ERR:', 'Arquivo de configuracao nao definido'
    return {'website': ret_dict}
