/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React from 'react'

import { PostFormButton } from '../../../components/posts/PostFormButton'
import { fireEvent, render, screen } from '@testing-library/react'

const props = {
  body: 'T',
  maxBody: 10,
  upload: () => {},
}

describe('PostFormButton Button', () => {
  it('bodyが存在する時、onClickイベントが呼び出されること', () => {
    const testMock = jest.fn()
    const newProps = { ...props, upload: testMock }
    //@ts-ignore
    render(<PostFormButton {...newProps} />)

    fireEvent.click(screen.getByText(/投稿/i))
    expect(testMock).toBeCalledTimes(1)
  })

  it('bodyが存在しない時、onClickイベントが呼び出されないこと', () => {
    const testMock = jest.fn()
    const newProps = { ...props, body: '', upload: testMock }
    //@ts-ignore
    render(<PostFormButton {...newProps} />)

    fireEvent.click(screen.getByText(/投稿/i))
    expect(testMock).toBeCalledTimes(0)
  })

  it('bodyがmaxBodyを越えた時、onClickイベントが呼び出されないこと', () => {
    const testMock = jest.fn()
    const newProps = { ...props, body: 'Test', maxBody: 3, upload: testMock }
    //@ts-ignore
    render(<PostFormButton {...newProps} />)

    fireEvent.click(screen.getByText(/投稿/i))
    expect(testMock).toBeCalledTimes(0)
  })
})
