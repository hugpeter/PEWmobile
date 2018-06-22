const gradeColor = [
    {color: 'red'},
    {color: 'red'},
    {color: 'orange'},
    {color: 'yellow'},
    {color: 'green'},
    {color: 'green'}
  ];

gradeColor.forEach(grade => {
    grade.fontSize = 18;
    grade.textShadowColor = 'rgba(0, 0, 0, 1.0)',
    grade.textShadowOffset = { width: -0.25, height: 0.25 },
    grade.textShadowRadius = 1
});

export default gradeColor;