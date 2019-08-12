$(function () {

    $('[data-toggle="popover"]').popover({
        animation: true,
        html: true,
        placement: 'auto right'
    });

    var coordSystems = {
        hg19: {
            speciesName: 'Human',
            taxon: 9606,
            auth: 'GRCh',
            version: '37',
            ucscName: 'hg19'
        },
        mm10: {
            speciesName: 'Mouse',
            taxon: 10090,
            auth: 'NCBIM',
            version: 37,
            ucscName: 'mm10'
        }
    };

    var genomes = {
        hg19: {
            name: 'Genome',
            twoBitURI: '/static/data/hg19/hg19.2bit',
            tier_type: 'sequence'
        },
        mm10: {
            name: 'Genome',
            twoBitURI: '/static/data/mm10/mm10.2bit',
            tier_type: 'sequence'
        }
    };

    var genes = {
        hg19: {
            name: 'Genes',
            desc: 'Gene structures from GENCODE 19',
            bwgURI: '/static/data/hg19/gencode.bb',
            collapseSuperGroups: true,
            trixURI: '/static/data/hg19/geneIndex.ix'
        },
        mm10: {
            name: 'Genes',
            desc: 'Gene structures from GENCODE 10',
            bwgURI: '/static/data/mm10/gencode.bb',
            collapseSuperGroups: true,
            trixURI: '/static/data/mm10/geneIndex.ix'
        }
    };

    $.ajax({
        url: 'biodalliance',
        methond: 'GET',
        success: function (result, status) {
            if ('success' == status) {
                new Browser({
                    pageName: 'biodalliance',
                    maxHeight: 800,
                    noPersist: true,
                    noDefaultLabels: true,
                    rulerLocation: 'right',
                    noTrackAdder: true,
                    noTrackEditor: true,
                    noExport: true,
                    noOptions: true,
                    noClearHighlightsButton: true,
                    disableDefaultFeaturePopup: true,

                    chr: result['chrom'],
                    viewStart: result['start'],
                    viewEnd: result['end'],

                    coordSystem: coordSystems[result['genome']],

                    sources: [
                        genomes[result['genome']],
                        genes[result['genome']],
                        {
                            name: 'H3k27ac',
                            desc: 'H3k27ac',
                            bwgURI: result['bw'],
                            style: [{
                                type: 'default',
                                style: {
                                    glyph: 'HISTOGRAM',
                                    BGCOLOR: '#2780e3',
                                    FGCOLOR: '#2780e3',
                                    HEIGHT: 150,
                                    id: 'style1'
                                }
                            }],
                            noDownsample: true
                        },
                        {
                            name: "TF",
                            uri: result['bed'],
                            tier_type: 'memstore',
                            payload: 'bed'
                        }
                    ]
                });
            } else {
                $('#biodalliance').html('<p>H3k27ac landscape load fail, please refresh this page to load it again!</p>');
            }
        },
        error: function () {
            $('#biodalliance').html('<p>H3k27ac landscape load fail, please refresh this page to load it again!</p>');
        }
    });

    function mappingPlot(seqs, start, size) {
        seqs.sort(function (a, b) {
            return b.start - a.start
        });

        var length = 0;
        seqs.forEach(function (seq) {
            length = Math.max(length, seq.start + start)
        });

        var end = start + size;

        var annotations = [];
        var xValues = [];
        var yValues = [];
        var zValues = [];

        seqs.forEach(function (seq, k) {
            var row = [];
            for (var i = 1; i < length; i++) {
                if (i >= start - 50 && i <= end + 50) {
                    if (typeof(seq.seq[i - seq.start]) == "undefined") {
                        row.push(0);
                    } else {
                        annotations.push({
                            xref: 'x1',
                            yref: 'y1',
                            x: i,
                            y: k,
                            text: seq.seq[i - seq.start],
                            showarrow: false,
                            font: {
                                size: 10,
                                color: '#eee'
                            }
                        });
                        if (i > start && i <= end) {
                            row.push(1);
                        } else {
                            row.push(0.5);
                        }
                    }
                    if (k == 0) {
                        xValues.push(i);
                    }
                }
            }
            yValues.push(k);
            zValues.push(row);

        });

        Plotly.newPlot('mapping', [{
            x: xValues,
            y: yValues,
            z: zValues,
            type: 'heatmap',
            hoverinfo: 'skip',
            colorscale: [
                [0, '#fff'],
                [0.5, '#2780e3'],
                [1, '#ff7518']
            ],
            showscale: false,
            xgap: 0.5,
            ygap: 0.5
        }], {
            annotations: annotations,
            margin: {
                l: 10, r: 10, t: 20, b: 20
            },
            xaxis: {
                visible: false,
                fixedrange: true
            },
            yaxis: {
                visible: false,
                fixedrange: true
            },
            height: Math.max(120, seqs.length * 20)
        }, {
            displaylogo: false,
            margin: {
                t: 10
            },
            modeBarButtonsToRemove: ['sendDataToCloud', 'hoverClosestCartesian', 'hoverCompareCartesian', 'toggleSpikelines']
        });
    }


    $.ajax({
        url: 'mapping',
        method: 'GET',
        success: function (result, status) {
            if ('success' == status) {
                var size = result['size'];
                $.ajax({
                    url: result['sam'],
                    method: 'GET',
                    success: function (result, status) {
                        if ('success' == status) {
                            var seqs = [];
                            var seqLength = 0;
                            result.replace(/\n$/, "").split('\n').forEach(function (line) {
                                if (line.indexOf('@') != 0) {
                                    var data = line.split('\t');
                                    seqs.push({
                                        seq: data[9],
                                        start: parseInt(data[3])
                                    });
                                    seqLength = Math.max(seqLength, parseInt(data[5].slice(0, -1)));
                                }
                            });
                            seqs = seqs.slice(0, 10);
                            mappingPlot(seqs, seqLength, size);
                        } else {
                            $('#mapping').html('<p>Mapping plot load fail, please refresh this page to load it again!</p>');
                        }
                    },
                    error: function () {
                        $('#mapping').html('<p>Mapping plot load fail, please refresh this page to load it again!</p>');
                    }
                });
            } else {
                $('#mapping').html('<p>Mapping plot load fail, please refresh this page to load it again!</p>');
            }
        },
        error: function () {
            $('#mapping').html('<p>Mapping plot load fail, please refresh this page to load it again!</p>');
        }
    });

    if (typeof document.getElementById('expression') != 'null') {
        $.ajax({
            url: 'expression',
            method: 'GET',
            success: function (result, status) {
                if ('success' == status) {
                    Plotly.d3.tsv(result['data'], function (err, rows) {

                        if (err === null) {
                            function unpack(rows, key, status) {
                                return rows.map(function (row) {
                                    if (row['status'] == status) {
                                        return row[key];
                                    }
                                });
                            }

                            var data = [{
                                type: 'box',
                                x: unpack(rows, 'cell_type', 'tumor'),
                                y: unpack(rows, 'value', 'tumor'),
                                whiskerwidth: 1,
                                marker: {color: '#ff7518', size: 2},
                                legendgroup: 'tumor',
                                scalegroup: 'tumor',
                                name: 'tumor'
                            }, {
                                type: 'box',
                                x: unpack(rows, 'cell_type', 'normal'),
                                y: unpack(rows, 'value', 'normal'),
                                whiskerwidth: 1,
                                marker: {color: '#2780e3', size: 2},
                                legendgroup: 'normal',
                                scalegroup: 'normal',
                                name: 'normal'
                            }];

                            var layout = {
                                title: "The gene expression profile across all tumor samples and paired normal tissues(GEPIA)",
                                legend: {
                                    orientation: "h",
                                    xanchor: 'center',
                                    x: 0.5,
                                    y: 1.1
                                },
                                boxmode: 'group',
                                yaxis: {
                                    title: 'Log2(TPM+1)'
                                },
                                height: 500
                            };

                            Plotly.plot('expression', data, layout, {
                                displaylogo: false,
                                modeBarButtonsToRemove: ['sendDataToCloud', 'hoverClosestCartesian', 'hoverCompareCartesian', 'toggleSpikelines']
                            });
                        } else {
                            $('#expression').html('<p>No data for this gene!</p>');
                        }
                    });
                } else {
                    $('#expression').html('<p>Expression plot load fail, please refresh this page to load it again!</p>');
                }
            },
            error: function () {
                $('#expression').html('<p>Expression plot load fail, please refresh this page to load it again!</p>');
            }
        });
    }

    if (typeof document.getElementById('ccle') != 'null') {
        $.ajax({
            url: 'ccle',
            method: 'GET',
            success: function (result, status) {
                if ('success' == status) {
                    Plotly.d3.tsv(result['data'], function (err, rows) {

                        if (err === null) {
                            function unpack(rows, key) {
                                return rows.map(function (row) {
                                    return row[key];
                                });
                            }

                            var data = [{
                                type: 'box',
                                x: unpack(rows, 'cell_type'),
                                y: unpack(rows, 'value'),
                                whiskerwidth: 1,
                                marker: {color: '#ff7518', size: 2},
                                name: 'ccle'
                            }];

                            var layout = {
                                title: "The gene expression profile in Cancer Cell Line(CCLE)",
                                legend: {
                                    orientation: "h",
                                    xanchor: 'center',
                                    x: 0.5,
                                    y: 1.1
                                },
                                yaxis: {
                                    title: 'Log2(RPKM)'
                                },
                                xaxis: {
                                    tickangle: -30
                                },
                                margin: {
                                    t: 50,
                                    b: 100
                                },
                                height: 500
                            };

                            Plotly.plot('ccle', data, layout, {
                                displaylogo: false,
                                modeBarButtonsToRemove: ['sendDataToCloud', 'hoverClosestCartesian', 'hoverCompareCartesian', 'toggleSpikelines']
                            });
                        } else {
                            $('#expression').html('<p>No data for this gene!</p>');
                        }
                    });
                } else {
                    $('#expression').html('<p>Expression plot load fail, please refresh this page to load it again!</p>');
                }
            },
            error: function () {
                $('#expression').html('<p>Expression plot load fail, please refresh this page to load it again!</p>');
            }
        });
    }


    function survivalPlot() {
        $('#survival').html('');
        var cancer = $('#cancer').val();
        var threshold = parseFloat($('#threshold').val());

        Plotly.d3.json('survival?cancer=' + cancer + '&threshold=' + threshold, function (err, data) {

            if (err === null) {
                var alterationsUpper = {
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Alterations Upper',
                    showlegend: false,
                    x: data['alterations_time'],
                    y: data['alterations_upper'],
                    line: {
                        shape: 'hv',
                        color: '#ff7518',
                        width: 0
                    }
                };

                var alterationsLower = {
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Alterations Lower',
                    showlegend: false,
                    x: data['alterations_time'],
                    y: data['alterations_lower'],
                    line: {
                        shape: 'hv',
                        color: '#ff7518',
                        width: 0
                    },
                    fill: 'tonexty'
                };

                var alterationsSurvival = {
                    type: 'scatter',
                    mode: 'lines',
                    name: 'Alterations Survival',
                    x: data['alterations_time'],
                    y: data['alterations_survival'],
                    line: {
                        shape: 'hv',
                        color: '#ff7518'
                    }
                };

                var noAlterationsUpper = {
                    type: 'scatter',
                    mode: 'lines',
                    name: 'No Alterations Upper',
                    showlegend: false,
                    x: data['no_alterations_time'],
                    y: data['no_alterations_upper'],
                    line: {
                        shape: 'hv',
                        color: '#2780e3',
                        width: 0
                    }
                };

                var noAlterationsLower = {
                    type: 'scatter',
                    mode: 'lines',
                    name: 'No Alterations Lower',
                    showlegend: false,
                    x: data['no_alterations_time'],
                    y: data['no_alterations_lower'],
                    line: {
                        shape: 'hv',
                        color: '#2780e3',
                        width: 0
                    },
                    fill: 'tonexty'
                };

                var noAlterationsSurvival = {
                    type: 'scatter',
                    mode: 'lines',
                    name: 'No Alterations Survival',
                    x: data['no_alterations_time'],
                    y: data['no_alterations_survival'],
                    line: {
                        shape: 'hv',
                        color: '#2780e3'
                    }
                };

                var layout = {
                    height: 550,
                    width: 550,
                    title: 'Logrank Test P-Value: ' + data['p_value'].toFixed(3),
                    legend: {
                        orientation: "h",
                        xanchor: 'center',
                        x: 0.5,
                        y: 1.3
                    },
                    yaxis: {
                        title: 'Percent survival'
                    },
                    xaxis: {
                        title: 'Months'
                    }
                };

                var data = [alterationsUpper, alterationsLower, alterationsSurvival, noAlterationsUpper, noAlterationsLower, noAlterationsSurvival];

                Plotly.newPlot('survival', data, layout, {
                    displaylogo: false,
                    modeBarButtonsToRemove: ['sendDataToCloud', 'hoverClosestCartesian', 'hoverCompareCartesian', 'toggleSpikelines']
                });
            } else {
                $('#survival').html('<p>No data for this gene!</p>');
            }
        });
    }

    $('#plot_survival').click(function () {
        survivalPlot();
    });

    if (typeof document.getElementById('survival') != 'null') {
        survivalPlot();
    }

    window.onresize = function () {
        Plotly.Plots.resize(document.getElementById('mapping'));
        if (typeof document.getElementById('expression').data != 'undefined') {
            Plotly.Plots.resize(document.getElementById('expression'));
        }
        if (typeof document.getElementById('ccle').data != 'undefined') {
            Plotly.Plots.resize(document.getElementById('ccle'));
        }
        if (typeof document.getElementById('survival').data != 'undefined') {
            Plotly.Plots.resize(document.getElementById('survival'));
        }
    };


});