import React, { useEffect, useState } from 'react'
import gql from 'graphql-tag'
import { Text, View, Button } from 'native-base'
import { useQuery } from '@apollo/react-hooks'
import { ReloadInstructions } from 'react-native/Libraries/NewAppScreen'
import { some } from 'lodash'

const ATTENDANCE_QUERY = gql`
  query attendanceList {
    attendances {
      id
      workDate
      startTime
      endTime
    }
  }
`

// TODO: clickable workDate to that single date details
// TODO: total income after the workDate: need calculation
// TODO: a search bar to check a time range and report some details like total work time + total predict revenue
export default ReportScreen = () => {
  const { data, loading, error, refetch } = useQuery(ATTENDANCE_QUERY, { fetchPolicy: "cache-and-network"  })

  // TODO: useReducer is better for this kind of action.
  // For now using useState. Will change later.
  const { attendances } = data || {}
  const [ attendanceList, setAttendaceList ] = useState([])
  const [ queryError, setQueryError ] = useState(null)
  const [ queryLoading, setQueryLoading ] = useState(false)

  useEffect(() => {
    setAttendaceList(attendances)
    setQueryError(error)
    setQueryLoading(loading)
  }, [attendances, error, loading])

  const handleReload = () => {
    setAttendaceList([])
    setQueryError(null)
    setQueryLoading(true)

    refetch().then((data) => {
      const { attendances } = data || {}
      setAttendaceList(attendances)
    }).catch((error) => {
      setQueryError(error)
    }).finally(() => {
      setQueryLoading(false)
    })
  }

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: 'flex-end' }}>
        <Text>Reports!</Text>
        <Button small onPress={ handleReload }><Text>Reload</Text></Button>
      </View>
      {
        some(attendanceList) && attendanceList.map(({ id, workDate }) => <Text key={id}>
          { `${workDate}` }
        </Text>)
        || (queryLoading && <Text>Loading</Text>)
        || (queryError && <Text>ERROR</Text>)
        || <Text>Empty</Text>
      }
    </View>
  )
}
