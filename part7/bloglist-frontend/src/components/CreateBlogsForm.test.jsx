import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { expect, test, vi } from 'vitest'
import CreateBlogsForm from './CreateBlogsForm'

test('creating a new blog form has correct information when blog is created', async () => {
  const mockhandler = vi.fn()

  render(<CreateBlogsForm createNewBlog={mockhandler}/>)
  const user = userEvent.setup()

  const titleInput = screen.getByLabelText('title:')
  const authorInput = screen.getByLabelText('author:')
  const urlInput = screen.getByLabelText('url:')

  await user.type(titleInput, 'testTitle')
  await user.type(authorInput, 'testAuthor')
  await user.type(urlInput, 'testUrl')

  const button = screen.getByText('create')

  await user.click(button)
  expect(mockhandler.mock.calls).toHaveLength(1)
})