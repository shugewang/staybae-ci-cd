import { render } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { SINGLE_PROPERTY } from 'src/__mocks__/fixtures/property/property';
import PropertyDetails from './PropertyDetails';
import { describe, it } from 'vitest';

vi.mock('react-query', () => ({
  useQuery: () => ({
    data: SINGLE_PROPERTY('1'),
    isLoading: false,
  }),
}));
describe('Property Details Page', () => {
  it('it should render with short description', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/property/1']}>
        <Routes>
          <Route path="/property/:id" element={<PropertyDetails />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(getByTestId('property-desc')).toHaveTextContent(
      'Two bedroom house in LA',
    );
  });

  it('it should render with long description', () => {
    const { getByTestId } = render(
      <MemoryRouter initialEntries={['/property/1']}>
        <Routes>
          <Route path="/property/:id" element={<PropertyDetails />} />
        </Routes>
      </MemoryRouter>,
    );
    expect(getByTestId('property-long-desc')).toHaveTextContent(
      SINGLE_PROPERTY('1').description,
    );
  });
});
