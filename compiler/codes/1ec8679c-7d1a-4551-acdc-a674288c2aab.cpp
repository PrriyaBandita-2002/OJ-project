#include <iostream> 
#include <string>   

int main() {

    int age;
    std::string name;
std::cout << "Enter your name: ";
    std::getline(std::cin, name); 


    std::cout << "Enter your age: ";
    std::cin >> age; 

    std::cout << "Hello, " << name << "! You are " << age << " years old." << std::endl;

    return 0; 
}