/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React from 'react'

import { UserShowHeader } from '../../../components/users/UserShowHeader'
import { render } from '@testing-library/react'

const props = {
  user: {
    uid: 'Test',
    displayName: 'TestUser',
    photoURL: 'T',
  },
  load: false,
}

describe('UserShowHeader photoURL', () => {
  it('loadがfalseの場合photoURLが表示される', () => {
    const { getByTestId } = render(<UserShowHeader {...props} />)
    const el = getByTestId('photo')

    expect(el).toBeTruthy()
  })

  it('loadがtrueの場合Skeletonが表示される', () => {
    const newProps = { ...props, load: true }
    const { getByTestId } = render(<UserShowHeader {...newProps} />)

    const el = getByTestId('photo-skeleton')

    expect(el.className).toBe(
      'MuiSkeleton-root MuiSkeleton-circle MuiSkeleton-pulse'
    )
    expect(el).toBeTruthy()
  })
})

describe('UserShowHeader displayName', () => {
  it('loadがfalseの場合displayNameが表示される', () => {
    const { getByTestId } = render(<UserShowHeader {...props} />)

    const name = getByTestId('name')

    expect(name.textContent).toBe(props.user.displayName)
    expect(name).toBeTruthy()
  })

  it('loadがtrueの場合Skeletonが表示される', () => {
    const newProps = { ...props, load: true }
    const { getByTestId } = render(<UserShowHeader {...newProps} />)

    const el = getByTestId('name-skeleton')

    expect(el.className).toBe(
      'MuiSkeleton-root MuiSkeleton-text MuiSkeleton-pulse'
    )
    expect(el).toBeTruthy()
  })
})
