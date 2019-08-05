from django.db import models
from .Sample import Sample
from .Gene import Gene
class Indel(models.Model):
    # 该突变所在的样本
    sample = models.ForeignKey(Sample, on_delete=models.CASCADE)
    # 该突变是否在dbSNP中出现
    #in_dbSNP = models.BooleanField()
    in_dbSNP = models.CharField(max_length=30)
    #
    ref_reads = models.IntegerField()
    ins_reads = models.IntegerField()
    # 突变所在染色体
    chrom = models.CharField(max_length=8)
    # 突变开始位置
    start = models.IntegerField()
    # 突变结束位置
    end = models.IntegerField()
    # 突变类型
    indel = models.CharField(max_length=9, choices=(('ins', 'insertion'), ('del', 'deletion')))
    # 突变序列
    sequence = models.CharField(max_length=64)
    # 突变大小
    size = models.IntegerField()
    # 关联的基因 entrezid
    related_gene = models.ForeignKey(Gene, on_delete=models.CASCADE)
    # TSS距离
    tss_distance = models.IntegerField()
    # 最邻近mRNA的refseq编号
    nearest_refseq = models.CharField(max_length=16)
    # 位置的大致注释
    annotation = models.CharField(max_length=32)
    # peak 位置
    peak_start = models.IntegerField()
    peak_end = models.IntegerField()
    # indel编号
    no = models.IntegerField()
    tfs = models.TextField()

    def __str__(self):
        return '{}:{}-{}{}{}'.format(
            self.chrom, self.start, self.end, '<' if self.indel == 'insertion' else '>', self.sequence
        )

    def __repr__(self):
        return '<Indel id={}>'.format(self.id)

    class Meta:
        ordering = ['-related_gene__priority']

