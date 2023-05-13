/* Your Code Here */

/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */


 // takes an array as an argument, and returns one object
 let createEmployeeRecord = function(row){
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

// takes an array of arrays, and returns an array of objects
let createEmployeeRecords = function(employeeRecordArray){
    return employeeRecordArray.map(employeeRecord => createEmployeeRecord(employeeRecord))
}

//takes date stamp ('YYYY-MM-DD HHMM') and returns record that was just updated. this function is called in the first function(is this statement tru?).... createEmployeeRecord
let createTimeInEvent = function(dateStamp){
    let [date, time] = dateStamp.split(' ')

    this.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(time, 10),
        //for date, since the key and property are same name, we can do shorthand...
        date
    })
    return this
}

let createTimeOutEvent = function(dateStamp){
    let [date, time] = dateStamp.split(' ')
    
    this.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(time, 10),
        date
    })

    return this
}

let hoursWorkedOnDate = function(targetDate){
    //just for clarification, timeIn and timeOut = the array element in which the target date is found... it is not equal to the date itself
    //also remember arrow function syntax, don't need to write return if it is on single line.
    let timeIn = this.timeInEvents.find(event => event.date == targetDate)
    let timeOut = this.timeOutEvents.find(event => event.date == targetDate)

    let hoursWorked = (timeOut.hour - timeIn.hour)/100
    return hoursWorked
}

let wagesEarnedOnDate = function(dateSought){
    let rawWage = hoursWorkedOnDate.call(this, dateSought)
        * this.payPerHour
    return parseFloat(rawWage.toString())
}


const allWagesFor = function () {
    const eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    const payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(rec){
      return rec.firstName === firstName
    })
  }
  
  let calculatePayroll = function(arrayOfEmployeeRecords){
      return arrayOfEmployeeRecords.reduce(function(memo, rec){
          return memo + allWagesFor.call(rec)
      }, 0)
  }