import { APILinksType, APIMetaType, JsonAPIType } from "../common/Common.types";

export type ContractType = 'evm' | 'ton';

export type EligibleContractType = {
  type: ContractType;
  chain: string;
  contractAddress: string;
}

export type GetChainsParams = {
  contractType: ContractType;
}

export type GetChainsResponse = {
  jsonapi: JsonAPIType;
  data: {
    type: "chain",
    attributes: {
      [key: string]: string;
    }
  }
}

export type NFTAttributesType = {
  contract_address: string;
  contract_name: string;
  contract_token_id: string;
  token_id: string;
  erc_type: string; // erc721
  amount: string;
  minter: string;
  owner: string;
  own_timestamp: number;
  mint_timestamp: number;
  mint_transaction_hash: string;
  mint_price: number;
  token_uri: string;
  metadata_json: string;
  name: string;
  content_type: string;
  content_uri: string;
  description: string;
  image_uri: string;
  external_link: string;
  latest_trade_price: string;
  latest_trade_symbol: string;
  latest_trade_token: string | null;
  latest_trade_timestamp: number;
  nftscan_id: string;
  nftscan_uri: string;
  small_nftscan_uri: string;
  attributes: unknown[];
  rarity_score: unknown;
  rarity_rank: unknown;
}

export type NFTType = {
  type: "nft";
  attributes: NFTAttributesType;
}

export type CollectionNFTAttributesType = {
  contract_address: string;
  contract_name: string;
  logo_url: string;
  owns_total: number;
  items_total: number;
  symbol: string;
  description: string;
  floor_price: number;
  verified: boolean;
  opensea_verified: boolean;
  is_spam: boolean;
  assets: NFTAttributesType[];
}

export type CollectionNFTType = {
  type: "collection-nft";
  attributes: CollectionNFTAttributesType;
}

export type CollectionAttributesType = {
  deploy_block_number: number;
  description: string;
  discord: string;
  email: string;
  erc_type: string;
  featured_url: string;
  floor_price: number;
  github: string;
  instagram: string;
  is_spam: boolean;
  items_total: number;
  kind: string;
  large_image_url: string;
  logo_url: string;
  medium: string;
  name: string;
  opensea_slug: string;
  opensea_verified: string;
  owner: string;
  owners_total: number;
  price_symbol: string;
  royalty: number;
  symbol: string;
  telegram: string;
  twitter: string;
  verified: boolean;
  website: string;
  contract_address: string;
  collections_with_same_name: string[];
  banner_url: string;
  amounts_total: number;
  attributes: unknown[]
}

export type CollectionType = {
  type: 'collection';
  id: string;
  attributes:  CollectionAttributesType;
}

export type GetOwnedNFTsParams = {
  page: number;
  size: number;
  walletAddress?: string;
  chain?: string;
  type: ContractType;
  contractAddress?: string[];
}

export type GetOwnedNFTsResponse = {
  jsonapi: JsonAPIType;
  meta: APIMetaType;
  links: APILinksType;
  data: CollectionNFTType[];
}

export type GetNFTsByContractParams = {
  page: number;
  size: number;
  chain?: string;
  type: ContractType;
  contractAddress?: string;
  cursor?: string;
}

export type GetNFTsByContractResponse = {
  jsonapi: JsonAPIType;
  meta: APIMetaType;
  links: APILinksType;
  data: NFTType[];
}

export type GetCollectionParams = {
  contractAddress?: string;
  type?: ContractType;
  chain?: string;
}

export type GetCollectionResponse = {
  jsonapi: JsonAPIType;
  data: CollectionType;
}