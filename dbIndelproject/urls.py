"""dbIndelproject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/1.10/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  url(r'^$', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  url(r'^$', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.conf.urls import url, include
    2. Add a URL to urlpatterns:  url(r'^blog/', include('blog.urls'))
"""

from django.conf.urls import url
from django.contrib import admin
from dbIndel.views import home
from dbIndel.views import statistics
from dbIndel.views import search
from dbIndel.views import biodalliance
from dbIndel.views import browsedata
from dbIndel.views import datasource
from dbIndel.views import download
from dbIndel.views import help
from dbIndel.views import plot
from dbIndel.views import sample
from dbIndel.views import indel

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^$', home.home, name="home"),
    url(r'^help', help.help, name="help"),
    url(r'^browsedata/$', browsedata.browsedata, name="browsedata"),
    url(r'^browsedata/table$', browsedata.browsedata_table, name="browsedata_table"),
    url(r'^datasource/$', datasource.datasource, name="datasource"),
    url(r'^datasource/table$', datasource.datasource_table, name="datasource_table"),
    url(r'^download/$', download.download, name="download"),
    url(r'^download/table$', download.download_table, name="download_table"),
    url(r'^download/multi/(?P<file>.+?)$', download.download_multi, name='download_multi'),
    url(r'^search$', search.search, name="search"),
    url(r'^search/table$', search.search_table, name="search_table"),
    url(r'^statistics$', statistics.statistics, name="statistics"),
    url(r'^statistics/biosample_plot$', plot.biosample_plot, name="biosample_plot"),
    url(r'^statistics/cancer_plot$', plot.cancer_plot, name="cancer_plot"),
    url(r'^sample/(?P<sample_id>.+?)/$', sample.sample, name='sample'),
    url(r'^sample/(?P<sample_id>.+?)/table$',sample.sample_table, name='sample_table'),
    url(r'^indel/(?P<indel_id>.+?)/$', indel.indel, name='indel'),
    url(r'^indel/(?P<indel_id>.+?)/biodalliance$', biodalliance.biodalliance, name='biodalliance'),
    url(r'^indel/(?P<indel_id>.+?)/mapping$', indel.mapping, name='mapping'),
    url(r'^indel/(?P<indel_id>.+?)/expression$', indel.expression, name='expression'),
    url(r'^indel/(?P<indel_id>.+?)/ccle$', indel.ccle, name='ccle'),
    url(r'^indel/(?P<indel_id>.+?)/survival$', indel.survival, name='survival'),
]

