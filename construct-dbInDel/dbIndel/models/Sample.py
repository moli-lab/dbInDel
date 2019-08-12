from django.db import models
class Sample(models.Model):
    # 样本名
    name = models.CharField(max_length=50)
    # 基因组
    genome = models.CharField(max_length=8)
    # 细胞类型
    cell_type = models.CharField(max_length=32)
    # 生物样本类型
    biosample_type = models.CharField(max_length=16)
    # 器官
    organ = models.CharField(max_length=64)
    # 疾病状态
    remark = models.CharField(max_length=64)
    cancer_type = models.CharField(max_length=32)
    # Pubmed ID
    pmid = models.CharField(max_length=16)
    # 文章标题
    title = models.TextField()
    # H3k27ac
    h3k27ac = models.CharField(max_length=16)
    # input
    input = models.CharField(max_length=16, default='N/A')

    lindel=models.IntegerField()

    def __str__(self):
        return self.name

    def __repr__(self):
        return '<Sample id={}>'.format(self.id)