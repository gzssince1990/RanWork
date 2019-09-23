import React, { useState, useMemo } from 'react'
import gql from 'graphql-tag'
import { Content, Text, View, Button } from 'native-base'
import DatePicker from 'react-native-datepicker'
import { useMutation } from '@apollo/react-hooks'
import moment from 'moment'
import { printBlockString } from 'graphql/language/blockString'

const PLACE_HOLDER = "Select Date"
const RICE_PER_HOUR = 9

const CREATE_WORK = gql`
  mutation CreateWork($input: CreateWorkInput!) {
    createWork(input: $input) {
      attendance {
        id
        workDate
        startTime
        endTime
      }
      errors
    }
  }
`

const UPDATE_START_WORK = gql`
  mutation updateStartWork($input: UpdateStartWorkInput!) {
    updateStartWork(input: $input) {
      attendance {
        id
        workDate
        startTime
        endTime
      }
      errors
    }
  }
`

const UPDATE_END_WORK = gql`
  mutation UpdateEndWork($input: UpdateEndWorkInput!) {
    updateEndWork(input: $input) {
      attendance {
        id
        workDate
        startTime
        endTime
      }
      errors
    }
  }
`

// TODO: split some code out, make your own custom hooks
// TODO: implement the useMutation. And make this app really usable
export default HomeScreen = () => {
  const [ createWork, { createLoading } ] = useMutation(CREATE_WORK)
  const [ updateStartWork, { updateStartLoading } ] = useMutation(UPDATE_START_WORK)
  const [ updateEndWork, { updateEndLoading } ] = useMutation(UPDATE_END_WORK)

  const [ chosenDate, setChosenDate ] = useState(moment())
  const [ startTime, setStartTime ] = useState(null)
  const [ endTime, setEndTime ] = useState(null)
  const [ revenue, setRevenue ] = useState(null)

  const today = useMemo(() => moment(), [])
  const timeDiff = useMemo(() => (startTime && endTime) && moment.duration(endTime.diff(startTime)), [startTime, endTime])
  const hourDiff = useMemo(() => timeDiff && timeDiff.get('hours'), [timeDiff])
  const minuteDiff = useMemo(() => timeDiff && timeDiff.get('minutes'), [timeDiff])
  const totalHours = useMemo(() => timeDiff && `${hourDiff} h and ${minuteDiff} m`, [timeDiff, hourDiff, minuteDiff])
  const predictedRice = useMemo(() => timeDiff && (hourDiff + minuteDiff / 60) * RICE_PER_HOUR || 0, [timeDiff, hourDiff, minuteDiff])

  const createWorkHandler = () => {

  }

  const getCompleteDateTime = time => `${chosenDate.format('ll')} ${time}`

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Home!</Text>
      <Text style={{ color: 'pink', fontSize: 20 }}>{ today.format('ll') }</Text>

      {
        startTime ? (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text>Started At:</Text>
            <DatePicker
              mode="time"
              showIcon={false}
              is24Hour={true}
              format={'LTS'}
              date={startTime}
              onDateChange={ time => setStartTime(moment(getCompleteDateTime(time))) }
            />
          </View>
        ) : (
          <Button
            small
            warning
            onPress={() => setStartTime(moment())}
          >
            <Text>Start</Text>
          </Button>
        )
      }
      {
        endTime ? (
          <>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text>Ended At</Text>
              <DatePicker
                mode="time"
                showIcon={false}
                is24Hour={true}
                format={'LTS'}
                date={endTime}
                onDateChange={ time => setEndTime(moment(getCompleteDateTime(time))) }
              />
            </View>
            <Text>
              { `Total hours: ${totalHours}` }
            </Text>
            <Text>
              { `Predicted revenue: ${predictedRice.toFixed(2)}` }
            </Text>
          </>
        ) : startTime && (
          <Button
            small
            success
            onPress={() => setEndTime(moment())}
          >
            <Text>End</Text>
          </Button>
        )
      }
    </View>
  )
}
