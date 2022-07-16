import { render, screen } from '@testing-library/react';

import Title from './index';

describe(`Index`, () => {
  it(`renders a Title component`, () => {
    render(<Title>Test Title</Title>);

    expect(screen.getByText(`Test Title`)).toBeInTheDocument();
  });
});
