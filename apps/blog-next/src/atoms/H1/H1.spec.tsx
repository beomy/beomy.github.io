import { render, screen } from '@testing-library/react';

import Title from './H1';

describe(`Index`, () => {
  it(`renders a Title component`, () => {
    render(<Title>Test Title</Title>);

    expect(screen.getByText(`Test Title`)).toBeInTheDocument();
  });
});
