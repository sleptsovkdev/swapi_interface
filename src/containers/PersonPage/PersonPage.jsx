import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { useParams } from 'react-router-dom'

import { getApiResourse } from '@utils/network'
import { API_PERSON } from '@constans/api'
import { withErrorApi } from '@hoc-helpers/withErrorApi'
import { getPeopleImage } from '@services/getPeopleData'
import PersonInfo from '@components/PersonPage/PersonInfo'
import PersonImage from '@components/PersonPage/PersonImage'
import BackButton from '@components/PersonPage/BackButton'


import styles from './PersonPage.module.css'

const PersonPage = ({ setErrorApi }) => {
  const { id } = useParams()
  const [personInfo, setPersonInfo] = useState(null)
  const [personName, setPersonName] = useState(null)
  const [personPhoto, setPersonPhoto] = useState(null)

  useEffect(() => {
    ;(async () => {
      const res = await getApiResourse(`${API_PERSON}/${id}/`)

      if (res && id) {
        setPersonInfo([
          { title: 'Height', data: res.height },
          { title: 'Mass', data: res.mass },
          { title: 'Hair Color', data: res.hair_color },
          { title: 'Skin Color', data: res.skin_color },
          { title: 'Eye Color', data: res.eye_color },
          { title: 'Birth Year', data: res.birth_year },
          { title: 'Gender', data: res.gender },
        ]),
          setPersonPhoto(getPeopleImage(id))

        setPersonName(res.name)
        setErrorApi(false)
      } else {
        setErrorApi(true)
      }
    })()
  }, [])

  return (
    <div className={styles.container}>
      <BackButton />
      <h1>{personName}</h1>
      <div className={styles.small_container}>
        <PersonImage personPhoto={personPhoto} personName={personName} />

        {personInfo && <PersonInfo personInfo={personInfo} />}
      </div>
    </div>
  )
}

PersonPage.propTypes = {
  match: PropTypes.object,
  setErrorApi: PropTypes.func,
}

export default withErrorApi(PersonPage)
