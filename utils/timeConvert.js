const timeConverter = (UNIX_timestamp, language) => {
    var d = UNIX_timestamp;
    var time = {};
    switch(language){
      case 'en':
        months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      case 'es':
        months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      case 'pt':
        months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      case 'ch':
        months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      default:
        months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];  
    }

    time.year = d.substring(0,4);
    time.month = months[d.substring(5,7) - 1];
    time.day = d.substring(8,10);
    time.hour = d.substring(11,13);
    time.min = d.substring(14,16);
        
    switch(language){
      case 'en':
        return ' ';
      case 'es':
        return ' ';
      case 'pt':
        return ' ';    
      case 'ch':
        return ' ';
      default:
        return time.month + ' ' + time.day + ', ' + time.year + ' ' + time.hour + ':' + time.min;
    }
  }

export default timeConverter;