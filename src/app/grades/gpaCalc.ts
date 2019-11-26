export class gpaCalc{

constructor(){};

public getGPA(wGPA, wGrades){
	for (var i in wGrades){
		wGPA = wGPA + this.convertGPA(wGrades[i].Grade);
	}	
	if (wGrades.length > 0){
		wGPA = Number((wGPA/wGrades.length).toFixed(2));
	}
	return wGPA;
}

public convertGPA(grade){
	if (grade == "A+"){
		return 4.33;
	}
	else if (grade == "A"){
		return 4;
	}
	else if (grade == "A-"){
		return 3.67;
	}
	else if (grade == "B+"){
		return 3.33;
	}
	else if (grade == "B"){
		return 3;
	}
	else if (grade == "B-"){
		return 2.67;
	}
	else if (grade == "C+"){
		return 2.33;
	}
	else if (grade == "C"){
		return 2;
	}
	else if (grade == "C-"){
		return 1.67;
	}
	else if (grade == "D+"){
		return 1.33;
	}
	else if (grade == "D"){
		return 1.33;
	}
	else if (grade == "D-"){
		return 1;
	}
	else if (grade == "F"){
		return 0;
	}
}

}