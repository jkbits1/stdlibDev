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

inmap (data, function(d) {return base.roundn(d, -1)})

var bmin = -5.0
var bmax = 5.0

var bwidth = 0.1
var nbins = ((bmax-bmin)/bwidth) + 1

var counts = new Int32Array(nbins)

function bidx(bmin, bwidth, v) {return base.round(base.abs(bmin-v)/bwidth)}

var dataLen = new Float64Array (100)

// at workshop
inmap (dataLen,
  function(v, i) {
    counts[bidx(bmin, bwidth, data[i])] += 1 
  });

// later
inmap (data, function (d, idx) {
  counts_idx = bidx(bmin, bwidth, d);
  counts[counts_idx] += 1;
})

inmap (dataLen,
  function(v, i) {
    return counts[bidx(bmin, bwidth, data[i])] += 1 
  });

// test
inmap (dataLen,
  function(v, i) {
    return console.log(data[i]);
    // counts[bidx(bmin, bwidth, data[i])] += 1 
  });


var bcenters = new Float64Array(nbins);
var bc;

inmap (bcenters, function (v, idx) {
  var bc = bmin + (bwidth * idx);
  bcenters[idx] = base.roundn(bc, -1);
});

var plt1 = plot([bcenters], [counts]);
plt1.xLabel = 'x';
plt1.yLabel = 'counts';

vdom2html(plt1.render())



var page1 = [
    1, 0, 0, 0, 0, 0, 1, 0, 0, 1,
    0, 0, 0, 1, 0, 0, 0, 1, 0, 0,
    0, 1, 1, 0, 0, 0, 0, 0, 0, 0
];
var page2 = [
    0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 1, 0, 0, 0,
    0, 0, 0, 0, 0, 0, 0, 1, 0, 0
];

function sum (acc, v) {return acc+v}
var sum1 = reduce(page1, 0, sum)

var sum2 = reduce(page2, 0, sum)
var mu1 = sum1 / page1.length
0.23333333333333334
var mu2 = sum2 / page2.length
0.06666666666666667
var out = ttest2( page1, page2 )
out.print()


// spam killer

var spam = datasets('SPAM_ASSASSIN')

var training=[]


var spamLen = new Float64Array (6046)

inmap (dataLen, function(v, i) {if spam[i].group === 'easy-ham-1' || spam[i].group === 'spam-2'{ training.push(spam[i]) }});

for ( var i = 0; i < spam.length; i++ ) {
    if ( spam[i].group === 'easy-ham-1' || spam[i].group === 'spam-2' ) {
        training.push( spam[i] );
    }
}

function extractBody( email ) {
    // Remove the meta-information before two initial line breaks:
    var LINE_BREAK_REGEXP = /[\r\n]{2}([\s\S]*)$/;
    var text = email.match( LINE_BREAK_REGEXP )[ 1 ];
    // Turn to lowercase such that a word is treated the same no matter its case:
    text = lowercase( text );
    // Expand contractions, e.g. don't => do not:
    text = expandContractions( text );
    text = removePunctuation( text );
    // Remove numbers and other special characters:
    text = text.replace( /[0-9\-\+]/g, '' );
    // Remove common words such as "the" or "and":
    text = removeWords( text, STOPWORDS );
    return text;
}

var STOPWORDS = datasets( 'STOPWORDS_EN' );


extractBody(spam[0].text)


training = inmap(training, function(x){
  x.body = extractBody(x.text);
  x.tokens = tokenize(x.body);
  return x;
})

kgryte@gmail.com

