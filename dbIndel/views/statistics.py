from django.shortcuts import render
def statistics(request):
    return render(request, "pages/statistics.html")