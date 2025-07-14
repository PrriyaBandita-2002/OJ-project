#include <iostream>
#include <vector>

using namespace std;

int main() {
    vector<int> nums;
    int n, temp;

    // Input: Read the size of the array
    cout << "Enter the size of the array: ";
    cin >> n;

    // Input: Read the elements of the array
    cout << "Enter the elements of the array: ";
    for (int i = 0; i < n; ++i) {
        cin >> temp;
        nums.push_back(temp);
    }
    // Two-pointer approach
    int nonZeroIndex = 0;
    for (int i = 0; i < nums.size(); ++i) {
        if (nums[i] != 0) {
            swap(nums[i], nums[nonZeroIndex]);
            nonZeroIndex++;
        }
    }

    // Output: Print the modified array
    cout << "[";
    for (int i = 0; i < nums.size(); ++i) {
        cout << nums[i];
        if (i < nums.size() - 1) {
            cout << ",";
        }
    }
    cout << "]" << endl;

    return 0;
