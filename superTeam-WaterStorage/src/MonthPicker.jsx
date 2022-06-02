import React, {useState} from 'react';
import MonthYearPicker from './MonthYearPickerExt';

function MonthPicker(props) {
  let date = props.date;
  const monthName = new Map();
  monthName.set(1, 'Jan');
  monthName.set(2, 'Feb');
  monthName.set(3, 'Mar');
  monthName.set(4, 'Apr');
  monthName.set(5, 'May');
  monthName.set(6, 'Jun');
  monthName.set(7, 'Jul');
  monthName.set(8, 'Aug');
  monthName.set(9, 'Sep');
  monthName.set(10, 'Oct');
  monthName.set(11, 'Nov');
  monthName.set(12, 'Dec');  
  
  const [visible,updateVisible] = useState(false);
  
  function showFun () {
    updateVisible(true);
  }
  
  function pickedYear (year) {
    updateVisible(false);
    props.yearFun(year);
  }
  
  function pickedMonth (month) {
    updateVisible(false);
    props.monthFun(month);
  }
    
  if (visible) {
    return (
        <div id="monthDiv">
          <form> <input type="pickertext" id="pickerid" name="pickername" defaultValue={monthName.get(date.month) + " " + date.year} /></form>
          <MonthYearPicker
            caption=""
            selectedMonth={date.month}
            selectedYear={date.year}
            minYear={2000}
            maxYear={2022}
            onChangeYear = {pickedYear}
            onChangeMonth = {pickedMonth}
            maxDate={new Date('06-01-2022')}
          />
        </div> 
    );
  } else {
    return (
      <form> 
        <input type="pickertext" id="pickerid" name="pickername" defaultValue={monthName.get(date.month) + " " + date.year} onClick={showFun}/>
      </form>
    )
  }
}

export default MonthPicker;