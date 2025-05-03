export const idlFactory = ({ IDL }) => {
  const Certificate = IDL.Record({
    'id' : IDL.Nat,
    'ownerName' : IDL.Text,
    'publicHash' : IDL.Text,
    'isRevoked' : IDL.Bool,
    'owner' : IDL.Principal,
    'privateHash' : IDL.Text,
    'imageURL' : IDL.Text,
    'timestamp' : IDL.Int,
    'previousId' : IDL.Opt(IDL.Nat),
  });
  return IDL.Service({
    'addCertificate' : IDL.Func(
        [IDL.Text, IDL.Text, IDL.Opt(IDL.Nat), IDL.Text, IDL.Text],
        [IDL.Nat],
        [],
      ),
    'getCertificateByHash' : IDL.Func(
        [IDL.Text],
        [IDL.Opt(Certificate)],
        ['query'],
      ),
    'getCertificateByIdWithHash' : IDL.Func(
        [IDL.Nat, IDL.Text],
        [IDL.Opt(Certificate)],
        [],
      ),
    'getCertificateHistory' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(Certificate)],
        ['query'],
      ),
    'getPrivateCertificate' : IDL.Func(
        [IDL.Text, IDL.Text],
        [IDL.Opt(Certificate)],
        [],
      ),
    'transferOwnershipCertificate' : IDL.Func(
        [IDL.Nat, IDL.Principal, IDL.Text, IDL.Text, IDL.Text, IDL.Text],
        [IDL.Text],
        [],
      ),
    'verifyHash' : IDL.Func([IDL.Text], [IDL.Opt(IDL.Nat)], ['query']),
  });
};
export const init = ({ IDL }) => { return []; };
