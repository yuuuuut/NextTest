/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/ban-ts-ignore */
import React from 'react'

import { PostFormImage } from '../../../components/posts/PostFormImage'
import { render } from '@testing-library/react'

const props = {
  previewImages: [1, 2],
  setPreviewImages: jest.fn(),
}

describe('PostFormImage FileInput', () => {
  it('previewImages.length が 2 の時、file inputが表示される', () => {
    //@ts-ignore
    const { getByTestId } = render(<PostFormImage {...props} />)
    const el = getByTestId('input')

    expect(el).toBeTruthy()
  })

  it('previewImages.length が 0 の時、file inputが表示される', () => {
    //@ts-ignore
    const { getByTestId } = render(<PostFormImage {...props} />)
    const el = getByTestId('input')

    expect(el).toBeTruthy()
  })

  it('previewImages.length が 5 の時、file inputが表示されない', () => {
    const newProps = { ...props, previewImages: [1, 2, 3, 4, 5] }
    //@ts-ignore
    const { queryByTestId } = render(<PostFormImage {...newProps} />)
    const el = queryByTestId('input')

    expect(el).toBeNull()
  })
})

describe('PostFormImage PostFormImagePreview', () => {
  it('previewImages.length が 0 の時、Componentが表示されない', () => {
    const newProps = { ...props, previewImages: [] }
    //@ts-ignore
    const { queryByTestId } = render(<PostFormImage {...newProps} />)
    const el = queryByTestId('postFormImagePreviewComp')

    expect(el).toBeNull()
  })
})
