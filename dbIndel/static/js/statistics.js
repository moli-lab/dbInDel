
$(function() {
  (function() {

  getCancerTypeData()
  getBioSamplesData()
  getCancerTypeForPlotData()

  function getCancerTypeData() {
    $.ajax({
      url: "static/data/indel-count-group-by-cancerType.txt",
      success: function(data, status){
        status === 'success' && txtToJson(data)
      }
    });
  }

  function getBioSamplesData() {
    var ajaxData = []
    $.ajax({
      url: "static/data/254human-samples-forPlot.txt",
      success: function(data, status){
        if(status === 'success') {
          ajaxData.push(data)
          $.ajax({
            url: "static/data/21murine-samples-forPlot.txt",
            success: function(data, status){
              status === 'success' && ajaxData.push(data) && txtToJson2(ajaxData)
            }
          });
        }
      }
    });
  }

  function getCancerTypeForPlotData() {
    $.ajax({
      url: "static/data/cancer_type_forPlot.txt",
      success: function(data, status){
        status === 'success' && txtToJson3(data)
      }
    });
  }

  function txtToJson(data) {
    var dataJson = {};
    var cancerArr = [], inserDataArr = [], deleDataArr = [], tempStr;
    data.split( "\n" ).splice(1).forEach((currentValue, index) => {
      tempStr = currentValue.split( "\t" )
      cancerArr.push(tempStr[0])
      inserDataArr.push(tempStr[1])
      deleDataArr.push(tempStr[2])
    })
    dataJson['cancerType'] = cancerArr;
    dataJson['data'] = { Insertion: inserDataArr, Deletion: deleDataArr }

    generateSizePlot(dataJson)
  }

  function txtToJson2(data) {
    var dataJson2 = {};
    var biosampleNames = [], biosampleNumbers = [], tempStr, humanCount = 0, mouseCount = 0;
    data.forEach((currentValue, index) => {
      biosampleNumbers = []
      currentValue.split( "\n" ).forEach((currentValue2, index2) => {
        if(currentValue2) {
          tempStr = currentValue2.split( "\t" )
          biosampleNames.push(tempStr[0])
          biosampleNumbers.push({name: tempStr[0], value: tempStr[1]})
          index === 0 && (humanCount = humanCount + (+tempStr[1]))
          index === 1 && (mouseCount = mouseCount + (+tempStr[1]))
        }
      })
      index === 0 && (dataJson2['human'] = { data: biosampleNumbers, count: humanCount })
      index === 1 && (dataJson2['mouse'] = { data: biosampleNumbers, count: mouseCount })
    })
    dataJson2['biosampleNames'] = biosampleNames

    generateBiosamplePlot(dataJson2)
  }

  function txtToJson3(data) {
    var dataJson3 = {};
    var cancerPlotNumbers = [], cancerPlotNames = [], cancerCount = 0, tempStr;
    data.split( "\n" ).forEach((currentValue, index) => {
      if(currentValue){
        tempStr = currentValue.split( "\t" )
        cancerPlotNames.push(tempStr[0])
        cancerPlotNumbers.push({name: tempStr[0], value: tempStr[1]})
        cancerCount = cancerCount + (+tempStr[1])
      }
    })
    dataJson3 = { data: cancerPlotNumbers, names: cancerPlotNames, count: cancerCount }
    console.log(dataJson3)
    generateCancerTypePiePlot(dataJson3)
  }

  var size_plot = echarts.init(document.getElementById('size_plot'));
  var biosample_plot = echarts.init(document.getElementById('biosample_plot'));
  var cancer_type_plot = echarts.init(document.getElementById('cancer_type_pie_plot'));

  function generateSizePlot(dataJson) {
    var sizePlotOption = {
      // title: {
      //   text: 'Number of Enhancer-Associated InDels by Cancer Types',
      //   textAlign:'center',
      //   left: '50%'
      // },
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
        data: dataJson.cancerType,
        axisLabel:{  
          interval: 0, 
          rotate: 45, 
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
            data: dataJson.data.Insertion,
            itemStyle: {
              color: '#FF802D'
            }
        },
        {
            name: 'Deletion',
            type: 'bar',
            stack: 'all',
            data: dataJson.data.Deletion,
            itemStyle: {
              color: '#2780e3'
            }
        }
      ]
    };

    if (sizePlotOption && typeof sizePlotOption === "object") {
      size_plot.setOption(sizePlotOption, true);
    }
  }

  function generateBiosamplePlot(dataJson2) {
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
      biosample_plot.setOption(biosampleOption, true);
    }
  }

  function generateCancerTypePiePlot(dataJson3) {
    var cancerTypeOption = {
    title : {
        text: 'all special',
        x:'left'
    },
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} samples"
      },
      legend: {
        right: '11.5%',
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

    if (cancerTypeOption && typeof cancerTypeOption === "object") {
      cancer_type_plot.setOption(cancerTypeOption, true);
    }
  }

  $(window).resize(function () {
    size_plot.resize();
    biosample_plot.resize();
    cancer_type_plot.resize();
  })
})()
})
