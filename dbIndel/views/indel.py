from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.http import JsonResponse
from django.contrib.staticfiles.templatetags.staticfiles import static
from lifelines.estimation import KaplanMeierFitter
from lifelines.statistics import logrank_test
from django.conf import settings
from ..models import Indel
import pandas as pd

def indel(request, indel_id):
    indel = get_object_or_404(Indel, pk=indel_id)
    cancers = indel.related_gene.article_set.all()
    return render(request, 'pages/indel.html', dict(indel=indel, cancers=cancers))
def mapping(request, indel_id):
    indel = get_object_or_404(Indel, pk=indel_id)
    return JsonResponse(dict(
        size=indel.size,
        sam=static('data/sam/{}-{}-{}.sam'.format(indel.indel.upper(), indel.sample.h3k27ac, indel.no)),
    ))
def ccle(request, indel_id):
    indel = get_object_or_404(Indel, pk=indel_id)
    return JsonResponse(dict(
        data=static('data/ccle/{}.txt'.format(indel.related_gene.id)),
    ))
def expression(request, indel_id):
    indel = get_object_or_404(Indel, pk=indel_id)
    return JsonResponse(dict(
        data=static('data/expression/{}.txt'.format(indel.related_gene.ensembl)),
    ))
def survival(request, indel_id):
    gene = get_object_or_404(Indel, pk=indel_id).related_gene.id
    cancer = request.GET.get('cancer')
    threshold = float(request.GET.get('threshold', '2.0'))
    try:
        clinical = pd.read_table('{}/{}/{}.txt'.format(settings.SURVIVAL_ROOT, cancer, gene))
    except FileNotFoundError:
        return HttpResponseNotFound()
    alterations = clinical.loc[clinical['expression'].abs() >= threshold].copy()
    no_alterations = clinical.loc[clinical['expression'].abs() < threshold].copy()
    kmf = KaplanMeierFitter()
    alterations_kmf = kmf.fit(alterations['OS_MONTHS'], alterations['EVENT'], label='alterations')
    kmf = KaplanMeierFitter()
    no_alterations_kmf = kmf.fit(no_alterations['OS_MONTHS'], no_alterations['EVENT'], label='no_alterations')
    sumarry = logrank_test(
        alterations['OS_MONTHS'], no_alterations['OS_MONTHS'], alterations['EVENT'], no_alterations['EVENT'], alpha=0.99
    )
    return JsonResponse(dict(
        alterations_time=alterations_kmf.survival_function_.index.tolist(),
        alterations_upper=alterations_kmf.confidence_interval_['alterations_upper_0.95'].fillna(1).tolist(),
        alterations_lower=alterations_kmf.confidence_interval_['alterations_lower_0.95'].fillna(1).tolist(),
        alterations_survival=alterations_kmf.survival_function_['alterations'].tolist(),
        no_alterations_time=no_alterations_kmf.survival_function_.index.tolist(),
        no_alterations_upper=no_alterations_kmf.confidence_interval_['no_alterations_upper_0.95'].fillna(1).tolist(),
        no_alterations_lower=no_alterations_kmf.confidence_interval_['no_alterations_lower_0.95'].fillna(1).tolist(),
        no_alterations_survival=no_alterations_kmf.survival_function_['no_alterations'].tolist(),
        p_value=sumarry.p_value
    ))