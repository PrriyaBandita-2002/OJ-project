#include <iostream>
#include <vector>
#include <sstream>
#include <algorithm>
using namespace std;

void moveZeroes(vector<int>& nums) {
    int index = 0;
    for (int i = 0; i < nums.size(); i++) {
        if (nums[i] != 0) {
            nums[index++] = nums[i];
        }
    }
    while (index < nums.size()) {
        nums[index++] = 0;
    }
}

int main() {
    string line;
    getline(cin, line);
    line.erase(remove(line.begin(), line.end(), '['), line.end());
    line.erase(remove(line.begin(), line.end(), ']'), line.end());
    replace(line.begin(), line.end(), ',', ' ');

    vector<int> nums;
    stringstream ss(line);
    int num;
    while (ss >> num) {
        nums.push_back(num);
    }

    moveZeroes(nums);

    cout << "[";
    for (int i = 0; i < nums.size(); i++) {
        cout << nums[i];
        if (i != nums.size() - 1) cout << ",";
    }
    cout << "]" << endl;
    return 0;
}