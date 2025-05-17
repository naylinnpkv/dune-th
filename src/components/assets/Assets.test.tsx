import { render, screen, fireEvent } from "@testing-library/react";
import Assets from "./Assets";

const mockAssets = [
  {
    id: "asset 1",
    name: "Asset 1",
    rank: "1",
    symbol: "A1",
    supply: "100",
    maxSupply: "100",
    marketCapUsd: "100",
    volumeUsd24Hr: "100",
    priceUsd: "100",
    changePercent24Hr: "100",
    explorer: "100",
    vwap24Hr: "100",
  },
  {
    id: "asset 2",
    name: "Asset 2",
    rank: "2",
    symbol: "A2",
    supply: "100",
    maxSupply: "100",
    marketCapUsd: "100",
    volumeUsd24Hr: "100",
    priceUsd: "100",
    changePercent24Hr: "100",
    explorer: "100",
    vwap24Hr: "100",
  },
  {
    id: "asset 3",
    name: "Asset 3",
    rank: "3",
    symbol: "A3",
    supply: "100",
    maxSupply: "100",
    marketCapUsd: "100",
    volumeUsd24Hr: "100",
    priceUsd: "100",
    changePercent24Hr: "100",
    explorer: "100",
    vwap24Hr: "100",
  },
  {
    id: "asset 4",
    name: "Asset 4",
    rank: "4",
    symbol: "A4",
    supply: "100",
    maxSupply: "100",
    marketCapUsd: "100",
    volumeUsd24Hr: "100",
    priceUsd: "100",
    changePercent24Hr: "100",
    explorer: "100",
    vwap24Hr: "100",
  },
];

jest.mock("swr/infinite", () => {
  return {
    __esModule: true,
    default: jest.fn(),
  };
});

import useSWRInfinite from "swr/infinite";

describe("Assets component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders initial assets", () => {
    (useSWRInfinite as jest.Mock).mockReturnValue({
      data: [{ data: mockAssets }],
      size: 1,
      setSize: jest.fn(),
      isValidating: false,
      isLoading: false,
      error: null,
    });

    render(<Assets initialAssets={mockAssets} />);

    mockAssets.forEach((asset) => {
      expect(screen.getByText(asset.name)).toBeInTheDocument();
    });
    expect(screen.getByText("View More")).toBeEnabled();
  });

  it("calls setSize when clicking 'View More'", () => {
    const setSizeMock = jest.fn();

    (useSWRInfinite as jest.Mock).mockReturnValue({
      data: [{ data: mockAssets }],
      size: 1,
      setSize: setSizeMock,
      isValidating: false,
      isLoading: false,
      error: null,
    });
    render(<Assets initialAssets={mockAssets} />);
    fireEvent.click(screen.getByText("View More"));
    expect(setSizeMock).toHaveBeenCalledWith(2);
  });
});
