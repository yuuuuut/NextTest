/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'

import { PostFormBodyInput } from '../../../components/posts/PostFormBodyInput'
import { render } from '@testing-library/react'

const props = {
  body: 'Test',
  setBody: () => {},
  maxBody: 100,
}

describe('Typography Test', () => {
  it('bodyが4文字、maxBodyが100の場合、4/100 と表示する', () => {
    const { getByTestId } = render(<PostFormBodyInput {...props} />)
    const e = getByTestId('text-length')

    expect(e.textContent).toBe('4/100')
  })

  it('bodyが1文字、maxBodyが100の場合、1/100 と表示する', () => {
    const newProps = { ...props, body: 'T' }

    const { getByTestId } = render(<PostFormBodyInput {...newProps} />)
    const e = getByTestId('text-length')

    expect(e.textContent).toBe('1/100')
  })

  it('bodyが4文字、maxBodyが10の場合、1/10 と表示する', () => {
    const newProps = { ...props, maxBody: 10 }

    const { getByTestId } = render(<PostFormBodyInput {...newProps} />)
    const e = getByTestId('text-length')

    expect(e.textContent).toBe('4/10')
  })
})
