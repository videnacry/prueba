export interface loginParams {
  pEmail: string;
  pPassword: string;
}

export const fetchLogin = async ({
  pEmail,
  pPassword,
}: loginParams): Promise<{
  response: any;
  isLogged: boolean;
  error: any;
}> => {
  const body = JSON.stringify({ email: pEmail.trim(), password: pPassword });
  const headers = {
    "Content-Type": "application/json",
    accept: "application/json",
  };
  const postData = { method: "POST", body, headers };
  try {
    const rawRes = await fetch("https://reqres.in/api/login", { ...postData });
    const parsedRes = await rawRes.json();
    const res = {
      response: parsedRes,
      isLogged: parsedRes.token !== undefined,
      error: parsedRes.error,
    };
    return res;
  } catch (e) {
    return { isLogged: false, error: e, response: null };
  }
};

export const init = async ({
  PCrypto = window.crypto,
  PTextEncoder = TextEncoder,
  PTextDecoder = TextDecoder,
}): Promise<{
  storageSession: {
    isLogged: boolean;
    error: any;
  };
  removeStorage: () => void;
  setStorage: (
    { pEmail, pPassword }: loginParams,
    pStorageName?: string,
  ) => Promise<{ error: any }>;
}> => {
  const getEncodedMsg = (pMessage: string): Uint8Array => {
    const enc = new PTextEncoder();
    return enc.encode(pMessage);
  };

  const getDecodedMsg = (pEncoded: ArrayBuffer): string => {
    const dec = new PTextDecoder();
    return dec.decode(pEncoded);
  };

  const getEncryptedMsg = async (
    pMessage: string,
    pKey = key,
    pIv = iv,
  ): Promise<ArrayBuffer> => {
    const encoded = getEncodedMsg(pMessage);
    return await PCrypto.subtle.encrypt(
      { name: "AES-GCM", iv: pIv },
      pKey,
      encoded,
    );
  };

  const getDecryptedMsg = async (
    pCiphertext: ArrayBuffer,
    pKey = key,
    pIv = iv,
  ): Promise<string> => {
    const decrypted = await PCrypto.subtle.decrypt(
      { name: "AES-GCM", iv: pIv },
      pKey,
      pCiphertext,
    );
    return getDecodedMsg(decrypted);
  };

  const getStorageName = async (): Promise<string> => {
    const encrypted = await getEncryptedMsg("gEEt_iTeM-lloca1");
    return btoa(
      String.fromCharCode.apply(null, Array.from(new Uint8Array(encrypted))),
    );
  };

  const getKeysDecrypted = async ({
    pEmail,
    pPassword,
  }: loginParams): Promise<{
    email: string;
    password: string;
  }> => {
    const decodedEmail = new Uint8Array(
      atob(pEmail)
        .split("")
        .map((char) => char.charCodeAt(0)),
    );
    const decodedPassword = new Uint8Array(
      atob(pPassword)
        .split("")
        .map((char) => char.charCodeAt(0)),
    );
    const email = await getDecryptedMsg(decodedEmail);
    const password = await getDecryptedMsg(decodedPassword);
    return { email, password };
  };

  const getKeysEncrypted = async ({
    pEmail,
    pPassword,
  }: loginParams): Promise<{
    email: string;
    password: string;
  }> => {
    const emailEncrypted = await getEncryptedMsg(pEmail);
    const passwordEncrypted = await getEncryptedMsg(pPassword);
    const email = btoa(
      String.fromCharCode.apply(
        null,
        Array.from(new Uint8Array(emailEncrypted)),
      ),
    );
    const password = btoa(
      String.fromCharCode.apply(
        null,
        Array.from(new Uint8Array(passwordEncrypted)),
      ),
    );
    return { email, password };
  };

  const removeStorage = (): void => {
    localStorage.removeItem(storageName);
  };

  const getStorage = async (
    storageName: string,
  ): Promise<{
    isLogged: boolean;
    error: any;
  }> => {
    const strItem = localStorage.getItem(storageName);
    if (strItem != null) {
      const parsedItem = JSON.parse(strItem);
      const { email: pEmail, password: pPassword } = await getKeysDecrypted({
        pEmail: parsedItem.email,
        pPassword: parsedItem.password,
      });
      const { isLogged, error } = await fetchLogin({ pEmail, pPassword });
      return { isLogged, error };
    }
    return {
      isLogged: false,
      error: "Wasn't found a session in the browser.",
    };
  };

  const setStorage = async (
    { pEmail, pPassword }: loginParams,
    pStorageName = storageName,
  ): Promise<{ error: any }> => {
    try {
      const itemValue = await getKeysEncrypted({ pEmail, pPassword });
      localStorage.setItem(pStorageName, JSON.stringify(itemValue));
      return { error: null };
    } catch (e) {
      return { error: e };
    }
  };

  const getKey = async (): Promise<CryptoKey> => {
    const key = new Uint8Array([
      73, 120, 63, 86, 72, 66, 153, 83, 199, 123, 71, 225,
    ]);
    const encodedKey = btoa(String.fromCharCode.apply(null, Array.from(key)));
    const item = localStorage.getItem(encodedKey);
    if (item !== null) {
      const parsedItem = JSON.parse(item);
      const keyImported = await PCrypto.subtle.importKey(
        "jwk",
        parsedItem,
        { name: "AES-GCM", length: 256 },
        true,
        ["encrypt", "decrypt"],
      );
      return keyImported;
    } else {
      const newKey = await PCrypto.subtle.generateKey(
        {
          name: "AES-GCM",
          length: 256,
        },
        true,
        ["encrypt", "decrypt"],
      );
      const keyExport = await PCrypto.subtle.exportKey("jwk", newKey);
      localStorage.setItem(encodedKey, JSON.stringify(keyExport));
      return newKey;
    }
  };

  const key = await getKey();
  const iv = new Uint8Array([
    131, 125, 93, 178, 62, 150, 71, 106, 230, 191, 206, 55,
  ]);

  const storageName = await getStorageName();

  const storageSession = await getStorage(storageName);

  return { storageSession, removeStorage, setStorage };
};
