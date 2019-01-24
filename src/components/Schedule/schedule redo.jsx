






<div className='schedulePage'>

{
  this.state.avail[0] && !this.props.user.admin ?
    <div>
      <button className='toggleBtn' onClick={this.toggleApptCreator}>Schedule an Appointment</button>

      <div className={this.state.showApptCreator ? 'apptCreatorBackground' : 'apptCreatorBackground hidden'} >
        <div className='apptCreator'>

          <h1>Availability</h1>
          <div className='apptContainers'>
            <div className='calender'>
              <DayPicker
                onDayClick={this.handleDayClick}
                selectedDays={this.state.selectedDay}
                disabledDays={this.state.disabledDays}
              />
              {this.state.selectedDay ? (
                <p>{this.state.selectedDay.toLocaleDateString()}</p>
              ) : (
                  <p>Please select a day.</p>
                )}
            </div>

            <ul className='timesBox'>
              {availToDisplay}

            </ul>

            <div className='durationSelection'>
              {this.props.selectedTime}

              <label for="duration">Select a duration:</label>
              <select onChange={(e) => { this.handleChange('duration', e.target.value) }}
                name="Duration" id="duration"> Duration:
                <option value=''>--select a duration--</option>
                <option value='30'>30 Minutes</option>
                <option value='60'>60 Minutes</option>
                <option value='90'>90 Minutes</option>
                <option value='120'>120 Minutes</option>
              </select>

              <input type="text" onChange={e => { this.handleChange('comment', e.target.value) }} />
              {
                this.props.paid
                  ?
                  <img className='paidIcon' src={paidIcon} alt="paid" />
                  :
                  <Checkout
                    amount={(duration / 60) * pricePerHour * 100}
                  />
              }


              <button onClick={this.createAppt}>Schedule Session</button>

            </div>
          </div>
          <button onClick={this.toggleApptCreator}>Finish</button>
        </div>


      </div>

    </div>
    :
    null

}




{this.state.appts[0] && this.props.user.admin === true ?
  <div className='adminSchedule'>
    <div className='toggleBtnDiv'>
      <button className='toggleBtn' onClick={this.toggleApptCreator}>Add Availability</button>
    </div>

    <div className={this.state.showApptCreator ? 'apptCreatorBackground' : 'apptCreatorBackground hidden'} >
      <div className='apptCreator'>

        <h1>Availability</h1>
        <div className='apptContainers'>
          <div className='calender'>
            <DayPicker
              onDayClick={this.handleDayClick}
              selectedDays={this.state.selectedDay}
              disabledDays={this.state.disabledDays}
            />
            {this.state.selectedDay ? (
              <p>{this.state.selectedDay.toLocaleDateString()}</p>
            ) : (
                <p>Please select a day.</p>
              )}
          </div>
          <ul className='timesBox'>
            {availToDisplay}

          </ul>


          <div className='timeSelection'>
            <div>
              <label>Start time:</label>
              <input onChange={e => this.handleChange('start', e.target.value)} type="text" placeholder='h:mm am' />
            </div>
            <div>
              <label>End time:</label>
              <input onChange={e => this.handleChange('end', e.target.value)} type="text" placeholder='h:mm am' />
            </div>
            <button className='addBtn' onClick={this.addAvailability}>Add Availability</button>
          </div>




        </div>
        <button onClick={this.toggleApptCreator}>Finish</button>
      </div>


    </div>

    <div className='scheduleQuote'>
      <p>"You can have results or excuses</p>
      <p>not both."</p>
      <p>-Arnold Schwarzenegger</p>
    </div>

    <h1>Schedule</h1>
    <div className='table'>
      <table>
        <tr>
          <th scope="col">Client Name</th>
          <th scope="col">Date</th>
          <th scope="col">Time</th>
          <th scope="col">Duration (min)</th>
          <th scope="col">Payment</th>
          <th scope="col">Email</th>
          <th scope="col">Phone Number</th>
          <th scope="col">Comments</th>
          <th scope="col" colspan="2">Select</th>
        </tr>
        {apptsToDisplay}
      </table>

    </div>
    {/* <button>Delete Selection</button> */}
  </div>
  :
  this.state.appts[0] ?
    <div>

      <div className='scheduleQuote'>
        <p>"You can have results or excuses</p>
        <p>not both."</p>
        <p>-Arnold Schwarzenegger</p>
      </div>

      <h1>Schedule</h1>
      <table>
        <tr>
          <th scope="col">Date</th>
          <th scope="col">Time</th>
          <th scope="col">Duration (min)</th>
          <th scope="col">Payment</th>
          <th scope="col">Comments</th>
          <th scope="col" colspan="2">Select</th>
        </tr>
        {apptsToDisplay}
      </table>
      {/* <button>Delete Selection</button> */}

    </div>
    :

    this.props.user.admin === true ?
      <h3>No upcoming appointments</h3>
      :
      this.props.user.id ?
        <h3> No upcoming appointments. Book your training session today!</h3>
        :
        <div>
          <h3> Member? <Link className='inlineLink' to='/login'>Log in</Link> to book your training session.</h3>
          <h3> New here? <Link className='inlineLink' to='/login'>Register</Link> now to book your free consultation!</h3>
        </div>
}


</div>