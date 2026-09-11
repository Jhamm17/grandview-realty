jest.mock('@supabase/supabase-js', () => {
  const single = jest.fn();
  const upsert = jest.fn();
  const from = jest.fn(() => ({
    select: jest.fn(() => ({
      eq: jest.fn(() => ({ single })),
    })),
    upsert,
  }));

  return {
    createClient: jest.fn(() => ({ from })),
    __mocks: { single, upsert, from },
  };
});

import { PropertyCacheService } from '../property-cache';
import type { Property } from '../mred/types';

const {
  single: mockSingle,
  upsert: mockUpsert,
  from: mockFrom,
} = jest.requireMock('@supabase/supabase-js').__mocks;

const cachedProperty: Property = {
  ListingId: 'MRD12731381',
  ListingKey: 'MRD12731381',
  ModificationTimestamp: '2026-09-11T12:00:00.000Z',
  OriginatingSystemName: 'mred',
  StandardStatus: 'Active',
  MlgCanView: true,
  ListPrice: 500000,
  City: 'Chicago',
  StateOrProvince: 'IL',
  PostalCode: '60601',
  BedroomsTotal: 3,
  BathroomsTotalInteger: 2,
  LivingArea: 1800,
  PublicRemarks: 'Test listing',
};

describe('PropertyCacheService.getProperty', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockUpsert.mockResolvedValue({ error: null });
    global.fetch = jest.fn();
  });

  it('returns a fresh cached property without calling MLS', async () => {
    mockSingle.mockResolvedValue({
      data: {
        listing_id: cachedProperty.ListingId,
        property_data: cachedProperty,
        last_updated: new Date().toISOString(),
      },
      error: null,
    });

    await expect(PropertyCacheService.getProperty(cachedProperty.ListingId))
      .resolves.toEqual(cachedProperty);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('returns a stale cached property without calling MLS', async () => {
    mockSingle.mockResolvedValue({
      data: {
        listing_id: cachedProperty.ListingId,
        property_data: cachedProperty,
        last_updated: '2020-01-01T00:00:00.000Z',
      },
      error: null,
    });

    await expect(PropertyCacheService.getProperty(cachedProperty.ListingId))
      .resolves.toEqual(cachedProperty);
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it('uses the OData key endpoint and caches a property on a cache miss', async () => {
    mockSingle.mockResolvedValue({
      data: null,
      error: { code: 'PGRST116' },
    });
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: true,
      status: 200,
      json: jest.fn().mockResolvedValue(cachedProperty),
    });

    await expect(PropertyCacheService.getProperty(cachedProperty.ListingId))
      .resolves.toEqual(cachedProperty);

    expect(global.fetch).toHaveBeenCalledWith(
      expect.stringContaining(`/Property('${cachedProperty.ListingId}')?%24expand=Media`),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: expect.stringMatching(/^Bearer /),
        }),
      }),
    );
    expect(mockUpsert).toHaveBeenCalledWith(
      expect.objectContaining({
        listing_id: cachedProperty.ListingId,
        property_data: cachedProperty,
      }),
      { onConflict: 'listing_id' },
    );
  });

  it('does not hide an upstream failure as a missing property', async () => {
    mockSingle.mockResolvedValue({
      data: null,
      error: { code: 'PGRST116' },
    });
    (global.fetch as jest.Mock).mockResolvedValue({
      ok: false,
      status: 503,
    });

    await expect(PropertyCacheService.getProperty(cachedProperty.ListingId))
      .rejects.toThrow('Property API request failed: 503');
  });
});
