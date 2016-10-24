if (!Array.prototype.joinWith) {
    +function () {
        Array.prototype.joinWith = function(that, by, select, omit) {
            var together = [], length = 0;
            if (select) select.map(function(x){select[x] = 1;});
            function fields(it) {
                var f = {}, k;
                for (k in it) {
                    if (!select) { f[k] = 1; continue; }
                    if (omit ? !select[k] : select[k]) f[k] = 1;
                }
                return f;
            }
            function add(it) {
                var pkey = '.'+it[by], pobj = {};
                if (!together[pkey]) together[pkey] = pobj,
                    together[length++] = pobj;
                pobj = together[pkey];
                for (var k in fields(it))
                    pobj[k] = it[k];
            }
            this.map(add);
            that.map(add);
            return together;
        }
    }();
}
