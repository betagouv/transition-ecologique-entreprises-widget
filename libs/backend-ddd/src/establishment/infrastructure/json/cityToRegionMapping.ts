import { regionMapping } from '@tee/data/references'
import { Maybe } from 'true-myth'
import { CityToRegionMappingType } from '../../domain/spi'

export class CityToRegionMapping implements CityToRegionMappingType {
  public getRegion(cityCode: string): Maybe<string> {
    const cityRegionPair = regionMapping.find(
      (pair: { COM: string; REGION: string } | { COM: string; REGION: null }) => pair.COM === cityCode
    )
    return Maybe.of(cityRegionPair?.REGION)
  }
}
