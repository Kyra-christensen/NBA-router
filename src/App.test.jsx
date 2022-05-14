import {
  render,
  screen,
  waitFor,
  waitForElementToBeRemoved,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

describe('<App />', () => {
  it('should render a list of clickable films by Studio Ghibli, on click, navigates to the film detail page', async () => {
    render(
      <MemoryRouter initialEntries={['/', '/films/:id']} initialIndex={0}>
        <App />
      </MemoryRouter>
    );

    screen.getByText(/loading films.../i);
    await waitForElementToBeRemoved(await screen.findByText(/loading films.../i));

    const filmLink = await screen.findByRole('heading', {
      name: 'My Neighbor Totoro',
    });

    userEvent.click(filmLink);

    await screen.findByAltText('My Neighbor Totoro');

    await screen.findByRole('heading', { name: /my neighbor totoro/i });

    const backButton = screen.getByRole('button', {
      name: 'Back to All Films',
    });
    userEvent.click(backButton);

    screen.getByText(/studio ghibli film collection/i);
  });

  it('should render a header consisted of a heading element', async () => {
    render(
      <MemoryRouter>
        <App initialEntries={['/']} />
      </MemoryRouter>
    );

    screen.getByRole('heading', {
      name: 'Studio Ghibli Film Collection',
    });
    
  });
})