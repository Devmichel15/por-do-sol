$images = @{
    "logo.jpg" = "https://instagram.flad1-2.fna.fbcdn.net/v/t51.2885-19/514293525_17846603610514062_5500451777919081710_n.jpg?stp=dst-jpg_s150x150_tt6&efg=eyJ2ZW5jb2RlX3RhZyI6InByb2ZpbGVfcGljLmRqYW5nby4xMDgwLmMyIn0&_nc_ht=instagram.flad1-2.fna.fbcdn.net&_nc_cat=106&_nc_oc=Q6cZ2QE_VRdry0eun8zYlRrJykoDwaluzcg_Uqk7W1DVX6FV8d6I9lv1GVFsz93sW6pzfSg&_nc_ohc=fleTB-AVdTQQ7kNvwGS34Dl&_nc_gid=XNdR0MaUYhSofgciBAqq7A&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfmYfh--CwzlvUamtXYRtz8VC0K8Cyad53l8eyHuYqK61A&oe=6955A15A&_nc_sid=8b3546";
    "hero.jpg" = "https://instagram.flad1-2.fna.fbcdn.net/v/t51.2885-15/587800480_17867820813514062_7361586950926307396_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&_nc_ht=instagram.flad1-2.fna.fbcdn.net&_nc_cat=106&_nc_oc=Q6cZ2QE_VRdry0eun8zYlRrJykoDwaluzcg_Uqk7W1DVX6FV8d6I9lv1GVFsz93sW6pzfSg&_nc_ohc=u6trbVsy87EQ7kNvwFIZSK3&_nc_gid=XNdR0MaUYhSofgciBAqq7A&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_Afn7G6jGPj36bJFYQDjeRbWBvxLtZ_osHshZsUGz-CU0kQ&oe=6955A29F&_nc_sid=8b3546";
    "food1.jpg" = "https://instagram.flad1-2.fna.fbcdn.net/v/t51.2885-15/604788623_17868115200514062_827165895322214081_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&_nc_ht=instagram.flad1-2.fna.fbcdn.net&_nc_cat=106&_nc_oc=Q6cZ2QE_VRdry0eun8zYlRrJykoDwaluzcg_Uqk7W1DVX6FV8d6I9lv1GVFsz93sW6pzfSg&_nc_ohc=HZZzvShUXsIQ7kNvwEvCwgG&_nc_gid=XNdR0MaUYhSofgciBAqq7A&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfkFoVBhjqZA5zmERWMOtytZbDfzc2121_RqAVjlWZ0A0g&oe=69558B28&_nc_sid=8b3546";
    "cocktail.jpg" = "https://instagram.flad1-2.fna.fbcdn.net/v/t51.2885-15/605897422_17868343161514062_5291756099442504174_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&_nc_ht=instagram.flad1-2.fna.fbcdn.net&_nc_cat=106&_nc_oc=Q6cZ2QE_VRdry0eun8zYlRrJykoDwaluzcg_Uqk7W1DVX6FV8d6I9lv1GVFsz93sW6pzfSg&_nc_ohc=08tsssv3cqAQ7kNvwH65O9t&_nc_gid=XNdR0MaUYhSofgciBAqq7A&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfkGaJKLC1aOPB5K2fbbyZV114VKL63ub85iOzguVJfUww&oe=695592CE&_nc_sid=8b3546";
    "seafood.jpg" = "https://instagram.flad1-2.fna.fbcdn.net/v/t51.2885-15/600320559_17867583141514062_6286689893338713211_n.jpg?stp=dst-jpg_e35_p640x640_sh0.08_tt6&_nc_ht=instagram.flad1-2.fna.fbcdn.net&_nc_cat=106&_nc_oc=Q6cZ2QE_VRdry0eun8zYlRrJykoDwaluzcg_Uqk7W1DVX6FV8d6I9lv1GVFsz93sW6pzfSg&_nc_ohc=iQezuRSmUCwQ7kNvwGfryEi&_nc_gid=XNdR0MaUYhSofgciBAqq7A&edm=AOQ1c0wBAAAA&ccb=7-5&oh=00_AfnHZ6U8NRX5gK0rHix9ZScSfw-phgpjK4rpvBmK3nktSw&oe=695574CF&_nc_sid=8b3546";
}

if (!(Test-Path "public/images")) {
    New-Item -ItemType Directory -Force -Path "public/images"
}

foreach ($name in $images.Keys) {
    try {
        $url = $images[$name]
        Write-Host "Downloading $name..."
        Invoke-WebRequest -Uri $url -OutFile "public/images/$name" -ErrorAction Stop
        Write-Host "Saved public/images/$name"
    } catch {
        $err = $_.Exception.Message
        Write-Error "Failed to download ${name}: $err"
    }
}
