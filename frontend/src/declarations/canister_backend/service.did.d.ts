import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Certificate {
  'id' : bigint,
  'ownerName' : string,
  'publicHash' : string,
  'isRevoked' : boolean,
  'owner' : Principal,
  'privateHash' : string,
  'imageURL' : string,
  'timestamp' : bigint,
  'previousId' : [] | [bigint],
}
export interface _SERVICE {
  'addCertificate' : ActorMethod<
    [string, string, [] | [bigint], string, string],
    bigint
  >,
  'getCertificateByHash' : ActorMethod<[string], [] | [Certificate]>,
  'getCertificateByIdWithHash' : ActorMethod<
    [bigint, string],
    [] | [Certificate]
  >,
  'getCertificateHistory' : ActorMethod<[string], Array<Certificate>>,
  'getPrivateCertificate' : ActorMethod<[string, string], [] | [Certificate]>,
  'transferOwnershipCertificate' : ActorMethod<
    [bigint, Principal, string, string, string, string],
    string
  >,
  'verifyHash' : ActorMethod<[string], [] | [bigint]>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
