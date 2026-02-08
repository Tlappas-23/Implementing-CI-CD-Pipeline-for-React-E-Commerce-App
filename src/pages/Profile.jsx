import { useEffect, useState } from 'react'
import { Form, Button, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'
import { getUserDoc, updateUserDoc } from '../api/users'
import LoadingSpinner from '../components/LoadingSpinner'

function Profile() {
  const { currentUser, removeAccount } = useAuth()
  const navigate = useNavigate()

  const [profile, setProfile] = useState({ name: '', address: '' })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const loadProfile = async () => {
      if (!currentUser) return
      try {
        const doc = await getUserDoc(currentUser.uid)
        setProfile({
          name: doc?.name || '',
          address: doc?.address || ''
        })
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadProfile()
  }, [currentUser])

  const handleUpdate = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess('')

    try {
      // I only store profile fields in Firestore, not the password.
      await updateUserDoc(currentUser.uid, {
        name: profile.name,
        address: profile.address
      })
      setSuccess('Profile updated')
    } catch (err) {
      setError(err.message)
    }
  }

  const handleDelete = async () => {
    const confirmed = window.confirm(
      'Are you sure? This will delete your account and data.'
    )
    if (!confirmed) return

    setError('')
    try {
      await removeAccount()
      navigate('/')
    } catch (err) {
      setError(err.message)
    }
  }

  if (loading) return <LoadingSpinner />

  return (
    <div className="form-page">
      <h2>My Profile</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Form onSubmit={handleUpdate}>
        <Form.Control
          value={currentUser?.email || ''}
          readOnly
          disabled
        />
        <Form.Control
          className="mt-2"
          placeholder="Full Name"
          value={profile.name}
          onChange={(e) =>
            setProfile({ ...profile, name: e.target.value })
          }
        />
        <Form.Control
          className="mt-2"
          placeholder="Address"
          value={profile.address}
          onChange={(e) =>
            setProfile({ ...profile, address: e.target.value })
          }
        />
        <Button className="mt-3" type="submit">
          Update Profile
        </Button>
      </Form>

      <hr />

      <Button variant="danger" onClick={handleDelete}>
        Delete Account
      </Button>
    </div>
  )
}

export default Profile
