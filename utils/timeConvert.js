const timeConverter = (timestamp, language) => {
    var d = timestamp;
    var time = {};
    switch(language){
      case 'en':
        months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      case 'es':
        months = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic'];
      case 'pt':
        months = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Sep','Out','Nov','Dez'];
      case 'ch':
        months = ['一月','二月','三 月','四 月','五 月','六 月','七 月','八 月','九 月','十 月','十一 月','十二 月'];
      default:
        months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];  
    }

    time.year = d.substring(0,4);
    time.month = months[d.substring(5,7) - 1];
    time.day = d.substring(8,10);
    time.hour = d.substring(11,13);
    time.min = d.substring(14,16);

    if(time.hour - 12 < 0){
      time.type = 'a.m.';
      if(time.hour - 12 < -2){
        time.hour = time.hour.substring(1);
      }
    } else {
      time.type = 'p.m.';
      if(time.hour - 12 != 0){
        time.hour = time.hour - 12;
      }
    }
        
    switch(language){
      case 'en':
        return time.month + ' ' + time.day + ', ' + time.year + ' ' + time.hour + ':' + time.min + ' ' + time.type;
      case 'es':
        return time.day + ' ' + time.month + ', ' + time.year + ' ' + time.hour + ':' + time.min + ' ' + time.type;
      case 'pt':
        return time.day + ' ' + time.month + ', ' + time.year + ' ' + time.hour + ':' + time.min + ' ' + time.type;    
      case 'ch':
        return time.year + ' ' + time.month + ' ' + time.day + ' ' + time.hour + ':' + time.min + ' ' + time.type;
      default:
        return time.month + ' ' + time.day + ', ' + time.year + ' ' + time.hour + ':' + time.min + ' ' + time.type;
    }
  }

export default timeConverter;