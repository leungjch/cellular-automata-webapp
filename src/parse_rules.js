
var parse_input = function(input)
{
    var unique_count = [];
    items_list = input.split(",").map(Number)
    for (item of items_list)
    {
        if (item.includes("-"))
        {
            var splitRange = item.split('-').map(Number);
            for (let i = splitRange[0]; i <= splitRange[1]; i++)
            {
                unique_count.push(i);
            }
        }
        else
        {
            unique_count_count(item)
        }
    }
    // return unique
    return Array.from(new Set(unique_count_count))

}