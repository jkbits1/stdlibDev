var x = [ 1, 2, 3 ];

var y = [ 4, 5, 6 ];

var plt1 = plot( [x], [y] );

var vtree = plt1.render();

var htmlTree = vdom2html(vtree)

var el1 = document.querySelector('#basic-plot')

el1.innerHTML = htmlTree



var x = new Float64Array(100);
var y = new Float64Array(100);
inmap(x, base.random.randn)
inmap(y, base.random.randn)

var plt2 = plot([x], [y]);

plt2.title = 'Scatter'

plt2.lineStyle= 'none'
plt2.symbols='closed-circle'

plt2.xMin = -5.0
plt2.xMax = 5.0
plt2.yMin = -5.0
plt2.yMax = 5.0

var el2 = document.querySelector( '#scatter-plot' );

el2.innerHTML = vdom2html(plt2.render())

var x = new Int8Array(100);
inmap(x, function(v,i) {return i})

var y1 = new Float64Array(x.length)
var y2 = new Float64Array(x.length)

inmap(y1, function () {return base.random.normal(50.0, 20.0)})
inmap(y2, function () {return base.random.normal(60.0, 10.0)})

var plt3 = plot([x,x], [y1, y2])
plt3.title = 'Multiple lines'
plt3.lineStyle = ['-', ':']
plt3.lineOpacity = [0.9, 0.3]
plt3.colors = ['red', 'green']

var el3 = document.querySelector( '#multiple-line-plot' );
el3.innerHTML = vdom2html( plt3.render() );

// stat dists

var n=100
var data = new Float64Array(n)
inmap(data, function(){return base.random.normal(0.0, 1.0)})

