import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect, test, vi } from 'vitest'

test('renders title', () => {
  const blog = {
    author: 'Kirsi Huttunen',
    id: '69946f4d396b5c1e04518ecb',
    likes: 2342358,
    title: 'Kirsin lauantai',
    url: 'http://kirsinblog.com/kirsinlauantai',
    user: {
      id: '69944ec2b5b384e20e09b466',
      name: 'Kirsi Huttunen',
      username: 'kirsi88'
    }
  }

  render(<Blog blog={blog} user={{ username: 'testi' }}></Blog>)

  const title = screen.getByText('Kirsin lauantai Kirsi Huttunen')
  expect(title).toBeDefined()
})

test('show everything on button press', async () => {
  const blog = {
    author: 'Kirsi Huttunen',
    id: '69946f4d396b5c1e04518ecb',
    likes: 10,
    title: 'Kirsin lauantai',
    url: 'http://kirsinblog.com/kirsinlauantai',
    user: {
      id: '69944ec2b5b384e20e09b466',
      name: 'Kirsi Huttunen',
      username: 'kirsi88'
    }
  }
  render(<Blog blog={blog} user={{ username: 'testi' }} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const blogUser = screen.getByText('Kirsi Huttunen')
  const blogUrl = screen.getByText('http://kirsinblog.com/kirsinlauantai')
  const likes = screen.getByText('likes 10')

  expect(blogUser).toBeDefined()
  expect(blogUrl).toBeDefined()
  expect(likes).toBeDefined()
})

test('pressing like button twice calls function twice', async () => {
  const blog = {
    author: 'Kirsi Huttunen',
    id: '69946f4d396b5c1e04518ecb',
    likes: 10,
    title: 'Kirsin lauantai',
    url: 'http://kirsinblog.com/kirsinlauantai',
    user: {
      id: '69944ec2b5b384e20e09b466',
      name: 'Kirsi Huttunen',
      username: 'kirsi88'
    }
  }

  const mockhandler = vi.fn()

  render(<Blog blog={blog} user={{ username: 'testi' }} updateBlogLike={mockhandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('view')
  await user.click(button)

  const likebutton = screen.getByText('like')
  await user.click(likebutton)
  await user.click(likebutton)

  expect(mockhandler.mock.calls).toHaveLength(2)
})