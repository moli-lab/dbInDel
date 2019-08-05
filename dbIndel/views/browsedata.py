from ..models import Sample
from django.shortcuts import render
from django.http import JsonResponse
from django.db.models import Count

def browsedata(request):
    samples = Sample.objects
    select_genome = request.GET.get("genome")
    if select_genome:
        samples = samples.filter(genome=select_genome)
    select_biosample_type = request.GET.get("biosample_type")
    if select_biosample_type:
        samples = samples.filter(biosample_type=select_biosample_type)
    select_organ = request.GET.get("organ")
    if select_organ:
        samples = samples.filter(organ=select_organ)
    select_cell_type = request.GET.get("cell_type")
    if select_cell_type:
        samples = samples.filter(cell_type=select_cell_type)
    select_cancer_type = request.GET.get('cancer_type')
    if select_cancer_type:
        samples = samples.filter(cancer_type=select_cancer_type)
    biosample_type_query = samples.values("biosample_type").annotate(Count('biosample_type'))
    organ_query = samples.values("organ").annotate(Count('organ'))
    cell_type_query = samples.values("cell_type").annotate(Count('cell_type'))
    genome_query = samples.values("genome").annotate(Count('genome'))
    cancer_type_query = samples.values('cancer_type').annotate(Count('cancer_type'))
    return render(request, "pages/browsedata.html", dict(
        biosample_type=biosample_type_query, organ=organ_query,
        cell_type=cell_type_query, genome=genome_query, cancer_type=cancer_type_query
    ))
def browsedata_table(request):
    samples = Sample.objects
    select_genome = request.GET.get("genome")
    if select_genome:
        samples = samples.filter(genome=select_genome)
    select_biosample_type = request.GET.get("biosample_type")
    if select_biosample_type:
        samples = samples.filter(biosample_type=select_biosample_type)
    select_organ = request.GET.get("organ")
    if select_organ:
        samples = samples.filter(organ=select_organ)
    select_cell_type = request.GET.get("cell_type")
    if select_cell_type:
        samples = samples.filter(cell_type=select_cell_type)
    select_cancer_type = request.GET.get('cancer_type')
    if select_cancer_type:
        samples = samples.filter(cancer_type=select_cancer_type)
    samples = samples.values('biosample_type', 'cell_type', 'genome', 'id', 'name', 'organ', 'remark','lindel')
    return JsonResponse(dict(data=list(samples)))