from flask_bcrypt import Bcrypt

bcrypt = Bcrypt()

def hash_password(plain_password):
    hashed_password = bcrypt.generate_password_hash(plain_password).decode('utf-8')
    return hashed_password

# Example usage
if __name__ == "__main__":
    plain_password = input("Enter the password to hash: ")
    print("Hashed Password:", hash_password(plain_password))
