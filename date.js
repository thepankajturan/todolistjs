
    exports.getDate = () => {
    let date = new Date();
    let options = {
        weekday: 'long',
        month: 'long',
        year: 'numeric',
        day: 'numeric'
    }
    return date.toLocaleDateString('en-US', options);
}

exports.getDay = () => {
    let day = new Date();
    let options = {
        weekday:'long'  
    }
    return day.toLocaleDateString('en-US', options);
}