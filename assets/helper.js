const containsHTMLTags = (str) => {
    const htmlTagPattern = /<\/?[a-z][\s\S]*>/i;
    return htmlTagPattern.test(str);
}

module.exports = {
    containsHTMLTags
}