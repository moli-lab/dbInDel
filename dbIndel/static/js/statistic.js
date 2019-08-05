/*
@author:wenyuhao
@time:20190729
*/
$(function() {
hg_19_cancer_type={
title:'hg19',
count:254,
names:['Adenoid Cystic Cancer', 'Bladder Cancer', 'Brain Cancer', 'Breast Cancer', 'Cervical Cancer', 'Cholangio Cancer', 'Colorectal Cancer', 'Endometrioid Cancer', 'Ewing Sarcoma', 'Kidney Cancer', 'Leukemia', 'Liver Cancer', 'Lung Cancer', 'Lymphoma', 'Medulloblastoma', 'Melanoma', 'Meningioma', 'Myeloma', 'Neuroblastoma', 'Non-malignant ', 'Osteosarcoma', 'Other', 'Pancreatic Cancer', 'Prostate Cancer', 'Rhabdomyosarcoma'],
data:[{name: 'Adenoid Cystic Cancer',value: 1},{name: 'Bladder Cancer',value: 3},
{name: 'Brain Cancer',value: 20},{name: 'Breast Cancer',value: 9},
{name: 'Cervical Cancer',value: 2},{name: 'Cholangio Cancer',value: 1},
{name: 'Colorectal Cancer',value: 38},{name: 'Endometrioid Cancer',value: 17},
{name: 'Ewing Sarcoma',value: 3},{name: 'Kidney Cancer',value: 5},{name: 'Leukemia',value: 21},
{name: 'Liver Cancer',value: 3},{name: 'Lung Cancer',value: 7},{name: 'Lymphoma',value: 31},
{name: 'Medulloblastoma',value: 15},{name: 'Melanoma',value: 11},{name: 'Meningioma',value: 14},
{name: 'Myeloma',value: 3},{name: 'Neuroblastoma',value: 9},{name: 'Non-malignant ',value: 12},
{name: 'Osteosarcoma',value: 1},{name: 'Other',value: 2},{name: 'Pancreatic Cancer',value: 12},
{name: 'Prostate Cancer',value: 6},{name: 'Rhabdomyosarcoma',value: 8}]
}
mm_10_cancer_type={
title:'mm10',
count:21,
names:['Brain Cancer', 'Embryonal Cancer', 'Leukemia', 'Liver Cancer', 'Lung Cancer', 'Lymphoma', 'Medulloblastoma', 'Skin Cancer'],
data:[
{name: 'Brain Cancer',value: 1},{name: 'Embryonal Cancer',value: 2},
{name: 'Leukemia',value: 4},{name: 'Liver Cancer',value: 2},{name: 'Lung Cancer',value: 2},
{name: 'Lymphoma',value: 5},{name: 'Medulloblastoma',value: 4},{name: 'Skin Cancer',value: 1}]
}
Biosample=
{
  biosampleNames:['Cell Line','Tissue','Primary Cell','Non-malignant'],
  human:{count:254,data:[{name:'Cell Line',value:155},{name:'Tissue',value:56},{name:'Primary Cell',value:36},{name:'Non-malignant',value:7}]},
  mouse:{count:21,data:[{name:'Cell Line',value:4},{name:'Tissue',value:9},{name:'Primary Cell',value:8},{name:'Non-malignant',value:0}]}
}
var cancer_type_uniq =['Lymphoma','Colorectal Cancer','Prostate Cancer','Leukemia','Lung Cancer','Pancreatic Cancer','Breast Cancer','Non-malignant ','Ewing Sarcoma','Brain Cancer','Medulloblastoma','Neuroblastoma','Meningioma','Melanoma','Bladder Cancer','Myeloma','Rhabdomyosarcoma','Liver Cancer','Endometrioid Cancer','Other','Cholangio Cancer','Embryonal Cancer','Kidney Cancer','Adenoid Cystic Cancer','Cervical Cancer','Skin Cancer','Osteosarcoma'];
var cancer_type_all =['Colorectal Cancer','Lymphoma','Leukemia','Prostate Cancer','Pancreatic Cancer','Medulloblastoma','Breast Cancer','Lung Cancer','Non-malignant ','Meningioma','Brain Cancer','Neuroblastoma','Melanoma','Endometrioid Cancer','Ewing Sarcoma','Rhabdomyosarcoma','Bladder Cancer','Myeloma','Liver Cancer','Other','Cervical Cancer','Embryonal Cancer','Cholangio Cancer','Kidney Cancer','Adenoid Cystic Cancer','Skin Cancer','Osteosarcoma'];
var uniq_ins = [90674,70808,16658,26581,24604,23401,23189,14390,13916,14521,16180,13894,5501,10459,7588,7311,3794,7197,3876,6333,3793,3313,3037,2820,2462,10,29];
var uniq_del = [11026,26384,22427,5119,3005,3827,2738,2872,3299,2275,120,2029,5766,302,1969,1423,4033,608,3875,1184,358,384,393,450,381,20,0];
var all_ins = [127997,141905,40339,20861,35620,39267,31555,27054,24476,13702,19012,17310,19168,9978,14597,6286,8890,8995,8659,6506,4074,4036,3793,3493,2820,10,29];
var all_del = [41980,19617,7993,25907,5353,164,3749,3103,4618,12548,2922,2326,449,9259,3349,6091,2309,1692,667,1208,540,421,358,461,450,20,0];
cdata={uniq:{title:'uniq',cancer:cancer_type_uniq,data:{ins:uniq_ins,del:uniq_del}},
all:{title:'all',cancer:cancer_type_all,data:{ins:all_ins,del:all_del}}}

hg19_cancer_type_plot = echarts.init(document.getElementById('hg19_cancer_type_pie_plot'));
mm10_cancer_type_plot = echarts.init(document.getElementById('mm10_cancer_type_pie_plot'));
//Biosample_plot= echarts.init(document.getElementById("biosample_plot"));
uniq_plot=echarts.init(document.getElementById('indel_uniq_plot'));
all_plot=echarts.init(document.getElementById('indel_all_plot'));

hg19_cancer_type_plot.setOption(getCancerTypePiePlotOption(hg_19_cancer_type),true);
mm10_cancer_type_plot.setOption(getCancerTypePiePlotOption(mm_10_cancer_type),true);
//Biosample_plot.setOption(generateBiosamplePlotOption(Biosample));
uniq_plot.setOption(generateIndelPlot(cdata.uniq),true);
all_plot.setOption(generateIndelPlot(cdata.all),true);

  function generateIndelPlot(dataJson) {
    var sizePlotOption = {
       title: {
         text: dataJson.title,
         textAlign:'left',
         left: '10%'
       },
      tooltip : {
        trigger: 'axis',
        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      legend: {
        right: 0
      },
      grid: {
        left: '5%',
        right: '3%',
        bottom: 10,
        containLabel: true
      },
      xAxis:  {
        type: 'category',
        data: dataJson.cancer,
        axisLabel:{  
          interval: 0, 
          rotate: 40, 
        }  
      },
      yAxis: {
        type: 'value',
        name: 'Number of InDels',
        nameLocation: 'middle',
        nameGap: 65,
        nameTextStyle: {
          fontWeight: 'bold',
          fontSize: 16
        },
      },
      series: [
        {
            name: 'Insertion',
            type: 'bar',
            stack: 'all',
            data: dataJson.data.ins,
            itemStyle: {
              color: '#FF802D'
            }
        },
        {
            name: 'Deletion',
            type: 'bar',
            stack: 'all',
            data: dataJson.data.del,
            itemStyle: {
              color: '#2780e3'
            }
        }
      ]
    };

    if (sizePlotOption && typeof sizePlotOption === "object") {
      return sizePlotOption;
    }else return null;
  }

  function generateBiosamplePlotOption(dataJson2) {
    var biosampleOption = {
      tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} samples"
      },
      legend: {
        right: '15%',
        y: 'middle',
        orient: 'vertical',
        data: dataJson2.biosampleNames
      },

      graphic: [
        {
          type: 'text',
          top: '37%',
          left: '15%',
          style: {
            fill: '#2c3e50',
            text: dataJson2.human.count+"\nhuman\nsamples",
            textAlign: 'center',
            font: '1.5em "Microsoft YaHei", sans-serif'
          }
        },
        {
          type: 'text',
          top: '37%',
          right: '47.5%',
          style: {
            fill: '#2c3e50',
            text: dataJson2.mouse.count+"\nmurine\nsamples",
            textAlign: 'center',
            font: '1.5em "Microsoft YaHei", sans-serif'
          }
        }
      ],
      series: [
        {
          name:'human',
          type:'pie',
          radius : ['40%', '60%'],
          center : ['17.5%', '50%'],
          label: {
            normal: {
              show: false
            }
          },
          data: dataJson2.human.data,
          height: '60%'
        },
        {
          name:'mouse',
          type:'pie',
          radius : ['40%', '60%'],
          center : ['50%', '50%'],
          label: {
            normal: {
              show: false
            }
          },
          data: dataJson2.mouse.data
        }
      ]
    };

    if (biosampleOption && typeof biosampleOption === "object") {
      return biosampleOption;
    }
    else {return null;}
  }

function getCancerTypePiePlotOption(dataJson3) {
    var cancerTypeOption = {
      title : {
        text: dataJson3.title,
        x:'left'
    },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} samples"
      },
      legend: {
        left: '41.5%',
        y: 'middle',
        height: '60%',
        orient: 'vertical',
        data: dataJson3.names
      },
      graphic: [
        {
          type: 'text',
          top: '37%',
          left: '15%',
          style: {
            fill: '#2c3e50',
            text: dataJson3.count+"\nCancer\nsamples",
            textAlign: 'center',
            font: '1.5em "Microsoft YaHei", sans-serif'
          }
        }
      ],
      series: [
        {
          name:'remarks',
          type:'pie',
          radius: ['40%', '60%'],
          center: ['17.5%', '50%'],
          label: {
            normal: {
              show: false
            }
          },
          data: dataJson3.data
        }
      ]
    };
    return cancerTypeOption;
  }

});
