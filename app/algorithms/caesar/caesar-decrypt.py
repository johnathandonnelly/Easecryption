def encrypt(plaintext, shift):
    ciphertext = ""

    for i in range(len(plaintext)):
        char = plaintext[i]

        if (char.isupper()):
            ciphertext += chr((ord(char) + shift-65) % 26 + 65)
        
        else:
            ciphertext += chr((ord(char) + shift - 97) % 26 + 97)
    
    return ciphertext

def decrypt(ciphertext, shift):
    return encrypt(ciphertext, -shift)