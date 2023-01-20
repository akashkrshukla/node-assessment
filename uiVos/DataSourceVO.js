class DataSourceVO {
    count;
    items;

    constructor(list) {
        this.count = list.length;
        this.items = list;
    }
}
module.exports = { DataSourceVO }
