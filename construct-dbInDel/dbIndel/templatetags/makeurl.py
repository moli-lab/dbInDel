# -*- coding:utf-8 -*-
#
# author: yangmqglobe
# file: makeurl.py
# time: 2018/3/10
from django import template
from django.utils.http import urlencode

register = template.Library()


@register.simple_tag
def add_arg(request, category, item):
    args = request.GET.dict()
    args.update({category: item[category]})
    url_args = urlencode(args)
    if url_args:
        url_args = '?{}'.format(url_args)
    return url_args


@register.simple_tag
def delete_arg(request, category):
    args = request.GET.dict()
    args.pop(category, None)
    url_args = urlencode(args)
    if url_args:
        url_args = '?{}'.format(url_args)
    return url_args
