using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities;

namespace Core.Specification
{
    public class UserPhotoSpecification : BaseSpecification<Photo>
    {
        public UserPhotoSpecification(string userId)
        : base(p => p.AppUserId == userId)
        {
        }
    }
}